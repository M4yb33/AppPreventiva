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
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcrypt");
let DevicesService = class DevicesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerDevice(registerDeviceDto) {
        const { deviceUuid, platform } = registerDeviceDto;
        const existingDevice = await this.prisma.dev_devices.findUnique({
            where: { dev_uuid: deviceUuid },
        });
        if (existingDevice) {
            return {
                success: true,
                message: 'Device already registered',
                data: {
                    deviceId: existingDevice.dev_id,
                    deviceUuid: existingDevice.dev_uuid,
                    isConfigured: existingDevice.dev_is_configured,
                    alias: existingDevice.dev_alias,
                },
            };
        }
        const device = await this.prisma.dev_devices.create({
            data: {
                dev_uuid: deviceUuid,
                dev_platform: platform,
                dev_is_configured: false,
            },
        });
        return {
            success: true,
            message: 'Device registered successfully',
            data: {
                deviceId: device.dev_id,
                deviceUuid: device.dev_uuid,
                isConfigured: device.dev_is_configured,
            },
        };
    }
    async configureDevice(deviceId, configureDeviceDto) {
        const { alias, panicCode, settingsCode } = configureDeviceDto;
        const device = await this.prisma.dev_devices.findUnique({
            where: { dev_id: deviceId },
        });
        if (!device) {
            throw new common_1.NotFoundException('Device not found');
        }
        const panicCodeHash = await bcrypt.hash(panicCode, 10);
        const settingsCodeHash = await bcrypt.hash(settingsCode, 10);
        const updatedDevice = await this.prisma.dev_devices.update({
            where: { dev_id: deviceId },
            data: {
                dev_alias: alias,
                dev_panic_code_hash: panicCodeHash,
                dev_settings_code_hash: settingsCodeHash,
                dev_is_configured: true,
            },
        });
        return {
            success: true,
            message: 'Device configured successfully',
            data: {
                deviceId: updatedDevice.dev_id,
                alias: updatedDevice.dev_alias,
                isConfigured: updatedDevice.dev_is_configured,
            },
        };
    }
    async addTrustedContact(deviceId, addTrustedContactDto) {
        const { name, phone, relationship, priority } = addTrustedContactDto;
        const device = await this.prisma.dev_devices.findUnique({
            where: { dev_id: deviceId },
        });
        if (!device) {
            throw new common_1.NotFoundException('Device not found');
        }
        const contact = await this.prisma.tct_trusted_contacts.create({
            data: {
                tct_device_id: deviceId,
                tct_name: name,
                tct_phone: phone,
                tct_relationship: relationship,
                tct_priority: priority || 1,
            },
        });
        return {
            success: true,
            message: 'Trusted contact added successfully',
            data: {
                contactId: contact.tct_id,
                name: contact.tct_name,
                phone: contact.tct_phone,
                relationship: contact.tct_relationship,
                priority: contact.tct_priority,
            },
        };
    }
    async getTrustedContacts(deviceId) {
        const device = await this.prisma.dev_devices.findUnique({
            where: { dev_id: deviceId },
        });
        if (!device) {
            throw new common_1.NotFoundException('Device not found');
        }
        const contacts = await this.prisma.tct_trusted_contacts.findMany({
            where: { tct_device_id: deviceId },
            orderBy: { tct_priority: 'asc' },
        });
        return {
            success: true,
            message: 'Trusted contacts retrieved successfully',
            data: contacts.map((contact) => ({
                contactId: contact.tct_id,
                name: contact.tct_name,
                phone: contact.tct_phone,
                relationship: contact.tct_relationship,
                priority: contact.tct_priority,
                createdAt: contact.tct_created_at,
            })),
        };
    }
    async getDeviceByUuid(deviceUuid) {
        const device = await this.prisma.dev_devices.findUnique({
            where: { dev_uuid: deviceUuid },
            include: {
                trusted_contacts: true,
            },
        });
        if (!device) {
            throw new common_1.NotFoundException('Device not found');
        }
        return device;
    }
    async getDeviceById(deviceId) {
        const device = await this.prisma.dev_devices.findUnique({
            where: { dev_id: deviceId },
            include: {
                trusted_contacts: true,
            },
        });
        if (!device) {
            throw new common_1.NotFoundException('Device not found');
        }
        return device;
    }
};
exports.DevicesService = DevicesService;
exports.DevicesService = DevicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DevicesService);
//# sourceMappingURL=devices.service.js.map