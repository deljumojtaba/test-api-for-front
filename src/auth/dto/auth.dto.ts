import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from "class-validator";

export class AuthDto {
  @Expose()
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description: "user email",
    type: "string",
    default: "user@gmail.com",
  })
  email: string;

  @Expose()
  @IsOptional()
  @ApiProperty({
    description: "user full name",
    type: "string",
    default: "full name",
  })
  fullName: string;

  @Expose()
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  @ApiProperty({
    description: "user password",
    type: "string",
    default: "123456",
  })
  password: string;
}
