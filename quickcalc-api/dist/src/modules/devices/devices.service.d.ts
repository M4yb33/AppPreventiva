import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { ConfigureDeviceDto } from './dto/configure-device.dto';
import { AddTrustedContactDto } from './dto/add-trusted-contact.dto';
export declare class DevicesService {
    private prisma;
    constructor(prisma: PrismaService);
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
    configureDevice(deviceId: number, configureDeviceDto: ConfigureDeviceDto): Promise<{
        success: boolean;
        message: string;
        data: {
            deviceId: number;
            alias: string;
            isConfigured: boolean;
        };
    }>;
    addTrustedContact(deviceId: number, addTrustedContactDto: AddTrustedContactDto): Promise<{
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
    getTrustedContacts(deviceId: number): Promise<{
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
    getDeviceByUuid(deviceUuid: string): Promise<{
        trusted_contacts: {
            tct_name: string;
            tct_phone: string;
            tct_relationship: string | null;
            tct_priority: number;
            tct_created_at: Date;
            tct_id: number;
            tct_device_id: number;
        }[];
    } & {
        dev_id: number;
        dev_uuid: string;
        dev_alias: string | null;
        dev_platform: string;
        dev_is_configured: boolean;
        dev_panic_code_hash: string | null;
        dev_settings_code_hash: string | null;
        dev_created_at: Date;
        dev_updated_at: Date;
    }>;
    getDeviceById(deviceId: number): Promise<{
        trusted_contacts: {
            tct_name: string;
            tct_phone: string;
            tct_relationship: string | null;
            tct_priority: number;
            tct_created_at: Date;
            tct_id: number;
            tct_device_id: number;
        }[];
    } & {
        dev_id: number;
        dev_uuid: string;
        dev_alias: string | null;
        dev_platform: string;
        dev_is_configured: boolean;
        dev_panic_code_hash: string | null;
        dev_settings_code_hash: string | null;
        dev_created_at: Date;
        dev_updated_at: Date;
    }>;
}
