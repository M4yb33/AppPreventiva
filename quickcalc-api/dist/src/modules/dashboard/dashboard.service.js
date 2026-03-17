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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary() {
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
        const totalDevices = await this.prisma.dev_devices.count();
        const configuredDevices = await this.prisma.dev_devices.count({
            where: { dev_is_configured: true },
        });
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
    async getRecentAlerts(limit = 10) {
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map