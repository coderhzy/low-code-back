import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from '../../../libs/comm/interceptors/transform.interceptor';
import { AllExceptionsFilter } from '../../../libs/comm/exceptions/base.exception.filter';
import { HttpExceptionFilter } from '../../../libs/comm/exceptions/http.exception.filter';
import { generateDocument } from './doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());
  // 异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 创建文档
  generateDocument(app);

  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });

  await app.listen(9999);
}

bootstrap();
