import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from "class-validator";

export class CreateResturantDto {
  @Expose()
  @IsOptional()
  @ApiProperty({
    description: "resturant name",
    type: "string",
    default: "resturan 1",
  })
  name: string;

  @Expose()
  @IsOptional()
  @ApiProperty({
    description: "resturant phone",
    type: "string",
    default: "0213456543",
  })
  phone: string;
}
