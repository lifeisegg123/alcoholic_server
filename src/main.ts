import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const key = {
    type: process.env.GCP_TYPE,
    project_id: process.env.GCP_PROJECT_ID,
    private_key_id: process.env.GCP_PRIVATE_KEY_ID,
    private_key: process.env.GCP_PRIVATE_KEY,
    client_email: process.env.GCP_CLIENT_EMAIL,
    client_id: process.env.GCP_CLIENT_ID,
    auth_uri: process.env.GCP_AUTH_URI,
    token_uri: process.env.GCP_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_CERT_URL,
  };
  writeFileSync(join(__dirname + '../../gcp.json'), JSON.stringify(key));
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(5050);
}
bootstrap();
