import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertStatusDto } from './dto/update-alert-status.dto';
import { AddLocationDto } from './dto/add-location.dto';
import { AlertLogAction } from '../../common/enums';

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) { }

  async createAlert(createAlertDto: CreateAlertDto) {
    const { deviceUuid, triggerType, alias, latitude, longitude, accuracy } = createAlertDto;

    // Find device
    const device = await this.prisma.dev_devices.findUnique({
      where: { dev_uuid: deviceUuid },
    });

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    // Update device alias if provided
    if (alias) {
      await this.prisma.dev_devices.update({
        where: { dev_uuid: deviceUuid },
        data: { dev_alias: alias },
      });
    }

    // Create alert
    const alert = await this.prisma.alt_alerts.create({
      data: {
        alt_device_id: device.dev_id,
        alt_trigger_type: triggerType,
        alt_last_known_latitude: latitude,
        alt_last_known_longitude: longitude,
        alt_status: 'NEW',
        alt_internet_attempted: true,
        alt_internet_delivered: true,
      },
    });

    // Create initial location only if latitude/longitude provided
    if (latitude !== undefined && longitude !== undefined) {
      await this.prisma.alc_alert_locations.create({
        data: {
          alc_alert_id: alert.alt_id,
          alc_latitude: latitude,
          alc_longitude: longitude,
          alc_accuracy: accuracy,
        },
      });
    }

    // Create log
    const triggerLabel = triggerType === 'PANIC_CODE' ? 'Código de pánico' : 'Modo de prueba';
    await this.prisma.alg_alert_logs.create({
      data: {
        alg_alert_id: alert.alt_id,
        alg_action: AlertLogAction.ALERT_CREATED,
        alg_details: `Alerta creada automáticamente (${triggerLabel})`,
      },
    });

    return {
      success: true,
      message: 'Alert created successfully',
      data: {
        alertId: alert.alt_id,
        status: alert.alt_status,
        triggeredAt: alert.alt_triggered_at,
      },
    };
  }

  async getAllAlerts() {
    const alerts = await this.prisma.alt_alerts.findMany({
      include: {
        device: {
          select: {
            dev_id: true,
            dev_uuid: true,
            dev_alias: true,
            dev_platform: true,
          },
        },
        locations: {
          orderBy: {
            alc_captured_at: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        alt_triggered_at: 'desc',
      },
    });

    return {
      success: true,
      message: 'Alerts retrieved successfully',
      data: alerts.map((alert) => ({
        alertId: alert.alt_id,
        deviceId: alert.device.dev_id,
        deviceAlias: alert.device.dev_alias,
        devicePlatform: alert.device.dev_platform,
        status: alert.alt_status,
        triggerType: alert.alt_trigger_type,
        triggeredAt: alert.alt_triggered_at,
        latitude: alert.alt_last_known_latitude,
        longitude: alert.alt_last_known_longitude,
        assignedTo: alert.alt_assigned_to,
        notes: alert.alt_notes,
        internetDelivered: alert.alt_internet_delivered,
        smsDelivered: alert.alt_sms_delivered,
      })),
    };
  }

  async getAlertById(alertId: number) {
    const alert = await this.prisma.alt_alerts.findUnique({
      where: { alt_id: alertId },
      include: {
        device: {
          select: {
            dev_id: true,
            dev_uuid: true,
            dev_alias: true,
            dev_platform: true,
          },
        },
        locations: {
          orderBy: {
            alc_captured_at: 'desc',
          },
        },
        logs: {
          orderBy: {
            alg_created_at: 'desc',
          },
        },
      },
    });

    if (!alert) {
      throw new NotFoundException('Alert not found');
    }

    // Generate random coordinates for testing if not available
    let latitude = alert.alt_last_known_latitude;
    let longitude = alert.alt_last_known_longitude;

    if (!latitude || !longitude) {
      // Generate random coordinates (testing purposes)
      latitude = 40.4168 + (Math.random() - 0.5) * 0.1; // ~Madrid center
      longitude = -3.7038 + (Math.random() - 0.5) * 0.1;
    }

    return {
      success: true,
      message: 'Alert retrieved successfully',
      data: {
        alertId: alert.alt_id,
        deviceId: alert.alt_device_id,
        device: {
          deviceId: alert.device.dev_id,
          deviceUuid: alert.device.dev_uuid,
          alias: alert.device.dev_alias,
          platform: alert.device.dev_platform,
        },
        status: alert.alt_status,
        triggerType: alert.alt_trigger_type,
        triggeredAt: alert.alt_triggered_at,
        assignedTo: alert.alt_assigned_to,
        notes: alert.alt_notes,
        latitude,
        longitude,
        internetAttempted: alert.alt_internet_attempted,
        internetDelivered: alert.alt_internet_delivered,
        smsAttempted: alert.alt_sms_attempted,
        smsDelivered: alert.alt_sms_delivered,
        locations: alert.locations.map((loc) => ({
          locationId: loc.alc_id,
          latitude: loc.alc_latitude,
          longitude: loc.alc_longitude,
          accuracy: loc.alc_accuracy,
          capturedAt: loc.alc_captured_at,
        })),
        logs: alert.logs.map((log) => ({
          logId: log.alg_id,
          action: log.alg_action,
          details: log.alg_details,
          createdAt: log.alg_created_at,
        })),
      },
    };
  }

  async updateAlertStatus(alertId: number, updateAlertStatusDto: UpdateAlertStatusDto) {
    const { status, note, performedBy } = updateAlertStatusDto;

    // Check if alert exists
    const alert = await this.prisma.alt_alerts.findUnique({
      where: { alt_id: alertId },
    });

    if (!alert) {
      throw new NotFoundException('Alert not found');
    }

    // Update alert
    const updatedAlert = await this.prisma.alt_alerts.update({
      where: { alt_id: alertId },
      data: {
        alt_status: status,
        alt_notes: note ? (alert.alt_notes ? `${alert.alt_notes}\n${note}` : note) : alert.alt_notes,
        alt_assigned_to: performedBy || alert.alt_assigned_to,
      },
    });

    // Create log
    const statusMap: Record<string, string> = {
      NEW: 'Nueva',
      IN_REVIEW: 'En revisión',
      IN_PROGRESS: 'En progreso',
      ESCALATED: 'Escalada',
      CLOSED: 'Cerrada',
      TEST: 'Prueba',
    };
    const oldStatusLabel = statusMap[alert.alt_status] || alert.alt_status;
    const newStatusLabel = statusMap[status] || status;

    await this.prisma.alg_alert_logs.create({
      data: {
        alg_alert_id: alertId,
        alg_action: AlertLogAction.STATUS_CHANGED,
        alg_details: `Estado: ${oldStatusLabel} → ${newStatusLabel}${note ? ` · Nota: ${note}` : ''}`,
      },
    });

    return {
      success: true,
      message: 'Alert status updated successfully',
      data: {
        alertId: updatedAlert.alt_id,
        status: updatedAlert.alt_status,
        notes: updatedAlert.alt_notes,
      },
    };
  }

  async addLocation(alertId: number, addLocationDto: AddLocationDto) {
    const { latitude, longitude, accuracy } = addLocationDto;

    // Check if alert exists
    const alert = await this.prisma.alt_alerts.findUnique({
      where: { alt_id: alertId },
    });

    if (!alert) {
      throw new NotFoundException('Alert not found');
    }

    // Add location
    const location = await this.prisma.alc_alert_locations.create({
      data: {
        alc_alert_id: alertId,
        alc_latitude: latitude,
        alc_longitude: longitude,
        alc_accuracy: accuracy,
      },
    });

    // Update last known location in alert
    await this.prisma.alt_alerts.update({
      where: { alt_id: alertId },
      data: {
        alt_last_known_latitude: latitude,
        alt_last_known_longitude: longitude,
      },
    });

    // Create log
    await this.prisma.alg_alert_logs.create({
      data: {
        alg_alert_id: alertId,
        alg_action: AlertLogAction.LOCATION_UPDATED,
        alg_details: `New location added: ${latitude}, ${longitude}`,
      },
    });

    return {
      success: true,
      message: 'Location added successfully',
      data: {
        locationId: location.alc_id,
        latitude: location.alc_latitude,
        longitude: location.alc_longitude,
        accuracy: location.alc_accuracy,
        capturedAt: location.alc_captured_at,
      },
    };
  }

  async getAlertLogs(alertId: number) {
    // Check if alert exists
    const alert = await this.prisma.alt_alerts.findUnique({
      where: { alt_id: alertId },
    });

    if (!alert) {
      throw new NotFoundException('Alert not found');
    }

    const logs = await this.prisma.alg_alert_logs.findMany({
      where: { alg_alert_id: alertId },
      orderBy: { alg_created_at: 'desc' },
    });

    return {
      success: true,
      message: 'Alert logs retrieved successfully',
      data: logs.map((log) => ({
        logId: log.alg_id,
        action: log.alg_action,
        performedBy: log.alg_performed_by,
        details: log.alg_details,
        createdAt: log.alg_created_at,
      })),
    };
  }
}
