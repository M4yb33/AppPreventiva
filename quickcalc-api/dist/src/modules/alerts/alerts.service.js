"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const enums_1 = require("../../common/enums");
let AlertsService = class AlertsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAlert(createAlertDto) {
        const { deviceUuid, triggerType, latitude, longitude, accuracy } = createAlertDto;
        const device = await this.prisma.dev_devices.findUnique({
            where: { dev_uuid: deviceUuid },
        });
        if (!device) {
            throw new common_1.NotFoundException('Device not found');
        }
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
        await this.prisma.alc_alert_locations.create({
            data: {
                alc_alert_id: alert.alt_id,
                alc_latitude: latitude,
                alc_longitude: longitude,
                alc_accuracy: accuracy,
            },
        });
        await this.prisma.alg_alert_logs.create({
            data: {
                alg_alert_id: alert.alt_id,
                alg_action: enums_1.AlertLogAction.ALERT_CREATED,
                alg_details: `Alert created via ${triggerType}`,
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
                internetDelivered: alert.alt_internet_delivered,
                smsDelivered: alert.alt_sms_delivered,
            })),
        };
    }
    async getAlertById(alertId) {
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
            throw new common_1.NotFoundException('Alert not found');
        }
        return {
            success: true,
            message: 'Alert retrieved successfully',
            data: {
                alertId: alert.alt_id,
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
                    performedBy: log.alg_performed_by,
                    details: log.alg_details,
                    createdAt: log.alg_created_at,
                })),
            },
        };
    }
    async updateAlertStatus(alertId, updateAlertStatusDto) {
        const { status, note, performedBy } = updateAlertStatusDto;
        const alert = await this.prisma.alt_alerts.findUnique({
            where: { alt_id: alertId },
        });
        if (!alert) {
            throw new common_1.NotFoundException('Alert not found');
        }
        const updatedAlert = await this.prisma.alt_alerts.update({
            where: { alt_id: alertId },
            data: {
                alt_status: status,
                alt_notes: note ? (alert.alt_notes ? `${alert.alt_notes}\n${note}` : note) : alert.alt_notes,
                alt_assigned_to: performedBy || alert.alt_assigned_to,
            },
        });
        await this.prisma.alg_alert_logs.create({
            data: {
                alg_alert_id: alertId,
                alg_action: enums_1.AlertLogAction.STATUS_CHANGED,
                alg_performed_by: performedBy,
                alg_details: `Status changed from ${alert.alt_status} to ${status}${note ? `. Note: ${note}` : ''}`,
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
    async addLocation(alertId, addLocationDto) {
        const { latitude, longitude, accuracy } = addLocationDto;
        const alert = await this.prisma.alt_alerts.findUnique({
            where: { alt_id: alertId },
        });
        if (!alert) {
            throw new common_1.NotFoundException('Alert not found');
        }
        const location = await this.prisma.alc_alert_locations.create({
            data: {
                alc_alert_id: alertId,
                alc_latitude: latitude,
                alc_longitude: longitude,
                alc_accuracy: accuracy,
            },
        });
        await this.prisma.alt_alerts.update({
            where: { alt_id: alertId },
            data: {
                alt_last_known_latitude: latitude,
                alt_last_known_longitude: longitude,
            },
        });
        await this.prisma.alg_alert_logs.create({
            data: {
                alg_alert_id: alertId,
                alg_action: enums_1.AlertLogAction.LOCATION_UPDATED,
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
    async getAlertLogs(alertId) {
        const alert = await this.prisma.alt_alerts.findUnique({
            where: { alt_id: alertId },
        });
        if (!alert) {
            throw new common_1.NotFoundException('Alert not found');
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
};
exports.AlertsService = AlertsService;
exports.AlertsService = AlertsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlertsService);
//# sourceMappingURL=alerts.service.js.map