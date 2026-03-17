import { DevicesService } from './devices.service';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { ConfigureDeviceDto } from './dto/configure-device.dto';
import { AddTrustedContactDto } from './dto/add-trusted-contact.dto';
export declare class DevicesController {
    private readonly devicesService;
    constructor(devicesService: DevicesService);
    registerDevice(registerDeviceDto: RegisterDeviceDto): Promise<{
        success: boolean;
        message: string;
        data: {
            deviceId: number;
            deviceUuid: string;
            isConfigured: boolean;
            alias: string;
        };
    } | {
        success: boolean;
        message: string;
        data: {
            deviceId: number;
            deviceUuid: string;
            isConfigured: boolean;
            alias?: undefined;
        };
    }>;
    configureDevice(id: number, configureDeviceDto: ConfigureDeviceDto): Promise<{
        success: boolean;
        message: string;
        data: {
            deviceId: number;
            alias: string;
            isConfigured: boolean;
        };
    }>;
    addTrustedContact(id: number, addTrustedContactDto: AddTrustedContactDto): Promise<{
        success: boolean;
        message: string;
        data: {
            contactId: number;
            name: string;
            phone: string;
            relationship: string;
            priority: number;
        };
    }>;
    getTrustedContacts(id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            contactId: number;
            name: string;
            phone: string;
            relationship: string;
            priority: number;
            createdAt: Date;
        }[];
    }>;
}
