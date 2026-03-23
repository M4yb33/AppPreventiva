import { Controller, Post, Get, Patch, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertStatusDto } from './dto/update-alert-status.dto';
import { AddLocationDto } from './dto/add-location.dto';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) { }

  @Post('create')
  async createAlert(@Body() createAlertDto: CreateAlertDto) {
    return this.alertsService.createAlert(createAlertDto);
  }

  @Get()
  async getAllAlerts() {
    return this.alertsService.getAllAlerts();
  }

  @Get(':id')
  async getAlertById(@Param('id', ParseIntPipe) id: number) {
    return this.alertsService.getAlertById(id);
  }

  @Patch(':id/status')
  async updateAlertStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlertStatusDto: UpdateAlertStatusDto,
  ) {
    return this.alertsService.updateAlertStatus(id, updateAlertStatusDto);
  }

  @Post(':id/location')
  async addLocation(@Param('id', ParseIntPipe) id: number, @Body() addLocationDto: AddLocationDto) {
    return this.alertsService.addLocation(id, addLocationDto);
  }

  @Get(':id/logs')
  async getAlertLogs(@Param('id', ParseIntPipe) id: number) {
    return this.alertsService.getAlertLogs(id);
  }
}
