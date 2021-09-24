import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters( new AllExceptionFilter() ); // Manejo de errores 
  app.useGlobalInterceptors( new TimeOutInterceptor() ); // Manejo de maximo tiempo de espera , 2min
  app.useGlobalPipes( new ValidationPipe() );

  await app.listen( process.env.PORT || 4000 );
}
bootstrap();
