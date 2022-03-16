import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { ItemEntity } from "./entities/item.entity";

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}
  create(createItemDto: CreateItemDto): Promise<ItemEntity> {
    return this.prisma.item.create({
      data: {
        ...createItemDto,
      },
    });
  }
  // find all items
  findAll() {
    return this.prisma.item.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} item`;
  // }

  // update(id: number, updateItemDto: UpdateItemDto) {
  //   return `This action updates a #${id} item`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} item`;
  // }
}
