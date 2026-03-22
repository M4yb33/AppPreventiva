import { Controller, Post, Patch, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { ConfigureDeviceDto } from './dto/configure-device.dto';
import { AddTrustedContactDto } from './dto/add-trusted-contact.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) { }

  @Post('register')
  async registerDevice(@Body() registerDeviceDto: RegisterDeviceDto) {
    return this.devicesService.registerDevice(registerDeviceDto);
  }

  @Patch(':id/configuration')
  async configureDevice(
    @Param('id', ParseIntPipe) id: number,
    @Body() configureDeviceDto: ConfigureDeviceDto,
  ) {
    return this.devicesService.configureDevice(id, configureDeviceDto);
  }

  @Post(':id/contacts')
  async addTrustedContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() addTrustedContactDto: AddTrustedContactDto,
  ) {
    return this.devicesService.addTrustedContact(id, addTrustedContactDto);
  }

  @Get(':id/contacts')
  async getTrustedContacts(@Param('id', ParseIntPipe) id: number) {
    return this.devicesService.getTrustedContacts(id);
  }
}
