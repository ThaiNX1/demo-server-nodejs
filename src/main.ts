process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CrudConfigService } from '@nestjsx/crud';
import { config } from 'aws-sdk';
import { ValidationPipe } from '@nestjs/common';
import { ConfigBanner } from 'entities/config.entity';
import { ConfigService } from '@nestjs/config';

CrudConfigService.load({
  query: {
    limit: 10,
    maxLimit: 1000,
    cache: 2000,
    alwaysPaginate: true,
  },
  routes: {
    exclude: ['deleteOneBase'],
  },
});

import { AppModule } from 'app.module';
import * as firebase from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: ['error'] },
    // { logger: false },
  );

  await app.register(require('fastify-helmet'), {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  await app.register(require('fastify-cors'));
  await app.register(require('fastify-multipart'), {
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100, // Max field value size in bytes
      fields: 50, // Max number of non-file fields
      fileSize: 5000000, // For multipart forms, the max file size in bytes
      files: 50, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs
    },
  });

  const docsConfig = new DocumentBuilder()
    .setTitle("Tomeo's API")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docsConfig);

  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  // @ts-ignore
  config.update({
    accessKeyId: configService.get('BIZFLYS_STORAGE_ACCESS_KEY'),
    secretAccessKey: configService.get('BIZFLY_STORAGE_SECRET_KEY'),
    region: 'hn',
    // @ts-ignore
    endpoint: 'https://hn.ss.bfcplatform.vn',
    apiVersions: {
      s3: '2006-03-01',
    },
  });

  // Set the config options
  // const firebaseConfig: ServiceAccount = {
  //   projectId: configService.get('FIREBASE_PROJECT_ID'),
  //   privateKey: configService
  //     .get('FIREBASE_PRIVATE_KEY')
  //     ?.replace(/\\n/g, '\n'),
  //   clientEmail: configService.get('FIREBASE_CLIENT_EMAIL'),
  // };
  // Initialize the firebase admin app
  // firebase.initializeApp({
  //   credential: firebase.credential.cert(firebaseConfig),
  //   databaseURL: configService.get('FIREBASE_DATABASE_URL'),
  // });

  await app.listen(process.env.PORT || 4000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
