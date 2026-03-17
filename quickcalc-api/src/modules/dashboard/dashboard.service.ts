import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) { }

  async getSummary() {
    // Get alert counts by status
    const newAlerts = await this.prisma.alt_alerts.count({
      where: { alt_status: 'NEW' },
    });

    const inReview = await this.prisma.alt_alerts.count({
      where: { alt_status: 'IN_REVIEW' },
    });

    const inProgress = await this.prisma.alt_alerts.count({
      where: { alt_status: 'IN_PROGRESS' },
    });

    const escalated = await this.prisma.alt_alerts.count({
      where: { alt_status: 'ESCALATED' },
    });

    const closed = await this.prisma.alt_alerts.count({
      where: { alt_status: 'CLOSED' },
    });

    const test = await this.prisma.alt_alerts.count({
      where: { alt_status: 'TEST' },
    });

    // Get total devices
    const totalDevices = await this.prisma.dev_devices.count();

    const configuredDevices = await this.prisma.dev_devices.count({
      where: { dev_is_configured: true },
    });

    // Get total operators
    const totalOperators = await this.prisma.opr_operators.count();

    const activeOperators = await this.prisma.opr_operators.count({
      where: { opr_is_active: true },
    });

    return {
      success: true,
      message: 'Dashboard summary retrieved successfully',
      data: {
        alerts: {
          new: newAlerts,
          inReview,
          inProgress,
          escalated,
          closed,
          test,
          total: newAlerts + inReview + inProgress + escalated + closed + test,
        },
        devices: {
          total: totalDevices,
          configured: configuredDevices,
          notConfigured: totalDevices - configuredDevices,
        },
        operators: {
          total: totalOperators,
          active: activeOperators,
          inactive: totalOperators - activeOperators,
        },
      },
    };
  }

  async getRecentAlerts(limit: number = 10) {
    const alerts = await this.prisma.alt_alerts.findMany({
      take: limit,
      orderBy: { alt_triggered_at: 'desc' },
      include: {
        device: {
          select: {
            dev_id: true,
            dev_uuid: true,
            dev_alias: true,
            dev_platform: true,
          },
        },
      },
    });

    return {
      success: true,
      message: 'Recent alerts retrieved successfully',
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
      })),
    };
  }
}
