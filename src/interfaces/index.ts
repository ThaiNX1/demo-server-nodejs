import { HttpStatus } from '@nestjs/common';

export interface UserDecoded {
  email: string;
  permissions: string[];
  sub: number;
}

export interface IPagination {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<Entity> {
  data: Entity[];
  count: number;
  pagination: IPagination;
}

export interface throwErrorCartProduct {
  voucherCode: number;
  voucherUshadeCode: number;
  message: string;
  statusCode: HttpStatus.BAD_REQUEST | HttpStatus.NOT_FOUND;
}
