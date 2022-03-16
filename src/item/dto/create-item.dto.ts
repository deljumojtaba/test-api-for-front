import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from "class-validator";

export class CreateItemDto {
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
    description: "resturant item",
    type: "string",
    default: "about item",
  })
  description: string;

  @Expose()
  @IsOptional()
  @ApiProperty({
    description: "item price",
    type: "number",
    default: "about item",
  })
  price: number;
}
