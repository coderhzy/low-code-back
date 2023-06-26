import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version('2')
  // http://localhost:3000/v2
  getHello(): string {
    return this.appService.getHello();
  }
}
