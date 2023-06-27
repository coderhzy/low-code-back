import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';
import { BusinessException } from '../../../libs/comm/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: 'user',
  version: '1',
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

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

  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findError(): string {
    const a: any = {};
    console.log(a.b.c);
    return this.appService.getHello();
  }

  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('你这个参数错了');
    }

    return this.appService.getHello();
  }

  @Get('getTestName')
  @Version([VERSION_NEUTRAL, '1'])
  getTestName() {
    return this.configService.get('TEST_VALUE').name;
  }
}
