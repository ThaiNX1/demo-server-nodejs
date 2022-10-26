import { ApiProperty, PickType } from '@nestjs/swagger';
import { Matches, MaxLength, MinLength } from 'class-validator';
import { UserEntity } from 'entities/user.entity';

export class ResetPasswordDto extends PickType(UserEntity, [
  'tel',
  'password',
]) {
  @ApiProperty({
    description: 'Firebase Token',
  })
  idToken: string;
}
