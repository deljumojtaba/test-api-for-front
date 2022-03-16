import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AddItemToResturantDto } from "./dto/add-item-to-restorant.dto";
import { CreateResturantDto } from "./dto/create-resturant.dto";
import { UpdateResturantDto } from "./dto/update-resturant.dto";
import { ResturantEntity } from "./entities/resturant.entity";

@Injectable()
export class ResturantService {
  constructor(private prisma: PrismaService) {}
  create(createResturantDto: CreateResturantDto): Promise<ResturantEntity> {
    return this.prisma.resturant.create({
      data: {
        ...createResturantDto,
      },
    });
  }

  findAll() {
    return this.prisma.resturant.findMany();
  }

  // add item to resturant by item id and resturant id in body
  addItemToResturant(
    addItemToResturantDto: AddItemToResturantDto,
    userId: string
  ): Promise<ResturantEntity> {
    return this.prisma.resturant.update({
      where: {
        id: addItemToResturantDto.resturantId,
      },
      data: {
        items: {
          connect: {
            id: addItemToResturantDto.itemId,
          },
        },
      },
    });
  }

  findOne(id: string) {
    // return one resturant with resturant items
    return this.prisma.resturant.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });
  }

  // update(id: number, updateResturantDto: UpdateResturantDto) {
  //   return `This action updates a #${id} resturant`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} resturant`;
  // }
}
