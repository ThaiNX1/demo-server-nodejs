import { Module } from '@nestjs/common';
import { ConfigSystemService } from './config-system.service';
import { ConfigSystemController } from './config-system.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEntity } from '../../entities/config.entity';
import { UserEntity } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigEntity, UserEntity])],
  controllers: [ConfigSystemController],
  providers: [ConfigSystemService],
  exports: [ConfigSystemService],
})
export class ConfigSystemModule {}
