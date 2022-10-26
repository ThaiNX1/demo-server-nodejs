import { CrudController } from "@nestjsx/crud";
import { Crud } from "decorators/crud.decorator";
import { ProvinceEntity } from "entities/province.entity";
import { ProvinceService } from "./province.service";
import { Auth } from "decorators/auth.decorator";
import { Get, HttpCode } from "@nestjs/common";

@Crud({
  controller: "provinces",
  name: "Tỉnh/thành",
  model: {
    type: ProvinceEntity
  },
  query: {
    sort: [
      {
        field: "position",
        order: "ASC"
      },
      {
        field: "name",
        order: "ASC"
      }
    ]
  },
  routes: {
    exclude: ["deleteOneBase"],
    createOneBase: {
      decorators: [Auth()]
    },
    updateOneBase: {
      decorators: [Auth()]
    }
  }
})
export class ProvinceController implements CrudController<ProvinceEntity> {
  constructor(public readonly service: ProvinceService) {
  }

  @Get("/update-province")
  @HttpCode(200)
  async syncGhnProvince() {
    return this.service.updateProvinces();
  }
}
