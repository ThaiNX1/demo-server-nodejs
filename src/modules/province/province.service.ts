import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ProvinceEntity } from "entities/province.entity";
import { Repository } from "typeorm";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { DistrictEntity } from "../../entities/district.entity";
import { WardEntity } from "../../entities/ward.entity";

@Injectable()
export class ProvinceService extends TypeOrmCrudService<ProvinceEntity> {
  constructor(
    @InjectRepository(ProvinceEntity)
    public repo: Repository<ProvinceEntity>,
    @InjectRepository(DistrictEntity)
    public districtRepo: Repository<DistrictEntity>,
    @InjectRepository(WardEntity)
    public wardRepo: Repository<WardEntity>,
    private httpService: HttpService
  ) {
    super(repo);
  }

  /***
   * Cập nhật thông tin tỉnh thành phố
   */
  async updateProvinces(): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get("https://provinces.open-api.vn/api/?depth=3")
      );
      if (response) {
        response?.data?.map(async item => {
          const province = await this.repo.save({
            code: item.code,
            codeName: item.codename,
            name: item.name,
            phoneCode: item.phone_code,
            divisionType: item.division_type
          });
          item?.districts?.map(async dist => {
            const district = await this.districtRepo.save({
              name: dist.name,
              code: dist.code,
              codeName: dist.codename,
              divisionType: dist.division_type,
              provinceId: province.id
            });
            dist?.wards?.map(async _ward => {
              const ward = await this.wardRepo.save({
                name: _ward.name,
                code: _ward.code,
                codeName: _ward.codename,
                divisionType: _ward.division_type,
                districtId: district.id
              });
            });
          });
        });
      }
      return true;
    } catch (e) {
      return e;
    }
  }
}
