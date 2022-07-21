import { Module } from '@nestjs/common';
import { WardService } from 'modules/ward/ward.service';
import { WardController } from 'modules/ward/ward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WardEntity } from 'entities/ward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WardEntity])],
  controllers: [WardController],
  providers: [WardService],
  exports: [WardService],
})
export class WardModule {}
