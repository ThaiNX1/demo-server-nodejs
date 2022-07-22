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
    AuthModule,
    UserModule,
    ProvinceModule,
    DistrictModule,
    RoleModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
