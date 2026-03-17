import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertStatusDto } from './dto/update-alert-status.dto';
import { AddLocationDto } from './dto/add-location.dto';
export declare class AlertsController {
    private readonly alertsService;
    constructor(alertsService: AlertsService);
    createAlert(createAlertDto: CreateAlertDto): Promise<{
        success: boolean;
        message: string;
        data: {
            alertId: number;
            status: import(".prisma/client").$Enums.AlertStatus;
            triggeredAt: Date;
        };
    }>;
    getAllAlerts(): Promise<{
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
            notes: string;
            internetDelivered: boolean;
            smsDelivered: boolean;
        }[];
    }>;
    getAlertById(id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            alertId: number;
            device: {
                deviceId: number;
                deviceUuid: string;
                alias: string;
                platform: string;
            };
            status: import(".prisma/client").$Enums.AlertStatus;
            triggerType: import(".prisma/client").$Enums.TriggerType;
            triggeredAt: Date;
            assignedTo: string;
            notes: string;
            internetAttempted: boolean;
            internetDelivered: boolean;
            smsAttempted: boolean;
            smsDelivered: boolean;
            locations: {
                locationId: number;
                latitude: number;
                longitude: number;
                accuracy: number;
                capturedAt: Date;
            }[];
            logs: {
                logId: number;
                action: string;
                performedBy: string;
                details: string;
                createdAt: Date;
            }[];
        };
    }>;
    updateAlertStatus(id: number, updateAlertStatusDto: UpdateAlertStatusDto): Promise<{
        success: boolean;
        message: string;
        data: {
            alertId: number;
            status: import(".prisma/client").$Enums.AlertStatus;
            notes: string;
        };
    }>;
    addLocation(id: number, addLocationDto: AddLocationDto): Promise<{
        success: boolean;
        message: string;
        data: {
            locationId: number;
            latitude: number;
            longitude: number;
            accuracy: number;
            capturedAt: Date;
        };
    }>;
    getAlertLogs(id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            logId: number;
            action: string;
            performedBy: string;
            details: string;
            createdAt: Date;
        }[];
    }>;
}
