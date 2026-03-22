import { Controller, Get, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(AuthGuard('jwt'))
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get('summary')
  async getSummary() {
    return this.dashboardService.getSummary();
  }

  @Get('recent-alerts')
  async getRecentAlerts(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    return this.dashboardService.getRecentAlerts(limit);
  }
}
