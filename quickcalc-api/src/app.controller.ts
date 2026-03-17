import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      success: true,
      message: 'QuickCalc API is running',
      version: '1.0.0',
      endpoints: {
        auth: '/api/auth/login',
        devices: '/api/devices',
        alerts: '/api/alerts',
        dashboard: '/api/dashboard',
        operators: '/api/operators',
      },
      documentation: 'See API_TESTING.md for complete endpoint list',
    };
  }

  @Get('health')
  getHealth() {
    return {
      success: true,
      message: 'Server is healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
