import { PrismaService } from '../../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getSummary(): Promise<{
        success: boolean;
        message: string;
        data: {
            alerts: {
                new: number;
                inReview: number;
                inProgress: number;
                escalated: number;
                closed: number;
                test: number;
                total: number;
            };
            devices: {
                total: number;
                configured: number;
                notConfigured: number;
            };
            operators: {
                total: number;
                active: number;
                inactive: number;
            };
        };
    }>;
    getRecentAlerts(limit?: number): Promise<{
        success: boolean;
        message: string;
        data: {
            alertId: number;
            deviceId: number;
            deviceAlias: string;
            devicePlatform: string;
            status: import(".prisma/client").$Enums.AlertStatus;
            triggerType: import(".prisma/client").$Enums.TriggerType;
            triggeredAt: Date;
            latitude: number;
            longitude: number;
            assignedTo: string;
        }[];
    }>;
}
