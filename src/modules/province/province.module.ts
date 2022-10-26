import { Module } from "@nestjs/common";
import { ProvinceService } from "./province.service";
import { ProvinceController } from "./province.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProvinceEntity } from "entities/province.entity";
import { DistrictEntity } from "../../entities/district.entity";
import { WardEntity } from "../../entities/ward.entity";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProvinceEntity, DistrictEntity, WardEntity]),
    HttpModule
  ],
  controllers: [ProvinceController],
  providers: [ProvinceService],
  exports: [ProvinceService]
})
export class ProvinceModule {
}
