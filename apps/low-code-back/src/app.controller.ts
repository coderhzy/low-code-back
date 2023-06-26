import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  path: 'user',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  // http://localhost:3000/v2
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  @Version('2')
  findUser(): string {
    return 'findUser';
  }
}
