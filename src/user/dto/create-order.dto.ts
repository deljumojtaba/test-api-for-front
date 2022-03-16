import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from "class-validator";

export class CreateOrderDto {
  @Expose()
  @IsOptional()
  @ApiProperty({
    description: "resturant name",
    type: [],
    default: ["item1", "item2"],
  })
  items: [string];

  @Expose()
  @IsOptional()
  @ApiProperty({
    description: "resturant phone",
    type: "string",
    default: "0213456543",
  })
  resturantId: string;
}
