import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProvinceModule } from './modules/province/province.module';
import { DistrictModule } from './modules/district/district.module';
import { RoleModule } from './modules/role/role.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { CdnModule } from './modules/cdn/cdn.module';
import { OrderModule } from './modules/order/order.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { ProductModule } from './modules/product/product.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { IngredientCalculateModule } from './modules/ingredient-calculate/ingredient-calculate.module';
import { ConfigSystemModule } from './modules/config-system/config-system.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env',
        `config/.env.${process.env.NODE_ENV}`,
        'ormconfig.env',
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('TYPEORM_HOST'),
          port: configService.get<number>('TYPEORM_PORT'),
          username: configService.get<string>('TYPEORM_USERNAME'),
          password: configService.get<string>('TYPEORM_PASSWORD'),
          database: configService.get<string>('TYPEORM_DATABASE'),
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
          // logging: true,
          // entities: [join(__dirname, 'src/entities', '*.entity.ts')],
          entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
          // synchronize: !['development', 'production'].includes(
          //   process.env.NODE_ENV,
          // ),
          synchronize: true,
        };
      },
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        defaults: {
          from: 'cskh.ushare@gmail.com',
        },
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: 'cskh.ushare@gmail.com',
            pass: 'CSKH2022.',
          },
        },
        template: {
          dir: join(__dirname, '../templates/'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    ProvinceModule,
    DistrictModule,
    RoleModule,
    ConfigSystemModule,
    CategoryModule,
    BrandModule,
    CdnModule,
    ProductModule,
    OrderModule,
    WarehouseModule,
    IngredientModule,
    IngredientCalculateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
