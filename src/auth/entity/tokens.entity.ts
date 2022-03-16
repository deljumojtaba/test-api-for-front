import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from '../types';

export class TokensEntity implements Tokens {
  @ApiProperty({ example: 'wefgfdsdfnfhjdkdfngjfkdikjffjkdkjfd' })
  access_token: string;

  @ApiProperty({ example: 'wefgfdsdfnfhjdkdfngjfkdikjffjkdkjfd' })
  refresh_token: string;
}
