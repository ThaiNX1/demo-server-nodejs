import { RequestMethod, Type } from '@nestjs/common';
import { DECORATORS } from "@nestjs/swagger/dist/constants";

export const getApiTags = <T = any>(target: Type<T>) =>
  Reflect.getMetadata(DECORATORS.API_TAGS, target);

export const getPost = <T = any>(target: Type<T>) =>
  Reflect.getMetadata(RequestMethod.POST, target);
