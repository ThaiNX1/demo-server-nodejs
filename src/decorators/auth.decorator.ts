import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import { ACLGuard } from 'guards/acl.guard';

export function Auth() {
  return applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard, ACLGuard));
}
