import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { ConfigureDeviceDto } from './dto/configure-device.dto';
import { AddTrustedContactDto } from './dto/add-trusted-contact.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) { }

  async registerDevice(registerDeviceDto: RegisterDeviceDto) {
    const { deviceUuid, platform } = registerDeviceDto;

    // Check if device already exists
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

    // Create new device
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

  async configureDevice(deviceId: number, configureDeviceDto: ConfigureDeviceDto) {
    const { alias, panicCode, settingsCode } = configureDeviceDto;

    // Check if device exists
    const device = await this.prisma.dev_devices.findUnique({
      where: { dev_id: deviceId },
    });

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    // Hash the codes
    const panicCodeHash = await bcrypt.hash(panicCode, 10);
    const settingsCodeHash = await bcrypt.hash(settingsCode, 10);

    // Update device
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

  async addTrustedContact(deviceId: number, addTrustedContactDto: AddTrustedContactDto) {
    const { name, phone, relationship, priority } = addTrustedContactDto;

    // Check if device exists
    const device = await this.prisma.dev_devices.findUnique({
      where: { dev_id: deviceId },
    });

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    // Create trusted contact
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

  async getTrustedContacts(deviceId: number) {
    // Check if device exists
    const device = await this.prisma.dev_devices.findUnique({
      where: { dev_id: deviceId },
    });

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    // Get contacts
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

  async getDeviceByUuid(deviceUuid: string) {
    const device = await this.prisma.dev_devices.findUnique({
      where: { dev_uuid: deviceUuid },
      include: {
        trusted_contacts: true,
      },
    });

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    return device;
  }

  async getDeviceById(deviceId: number) {
    const device = await this.prisma.dev_devices.findUnique({
      where: { dev_id: deviceId },
      include: {
        trusted_contacts: true,
      },
    });

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    return device;
  }
}
