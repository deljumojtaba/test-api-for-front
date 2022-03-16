import { PartialType } from '@nestjs/swagger';
import { CreateResturantDto } from './create-resturant.dto';

export class UpdateResturantDto extends PartialType(CreateResturantDto) {}
