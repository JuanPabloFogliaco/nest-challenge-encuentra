import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Permito el ingreso a cualquier url front que consulte el service, no defino un origen puntual.
  app.enableCors();

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API - Formula 1')
    .setDescription('Documentacion de la API de Carreras Formula 1')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); //  /api -> es el endpoint donde esta la documentacion.

  await app.listen(3001);
}
bootstrap();
