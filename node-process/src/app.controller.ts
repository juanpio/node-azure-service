import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateActivityDto } from './service-bus/create-activity.dto';
import { JwtAuthGuard } from './auth/jwt.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createActivityDto: CreateActivityDto): Promise<void> {
    return this.appService.postOnServiceBus(createActivityDto);
  }
}
