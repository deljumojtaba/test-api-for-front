import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderDto } from "../dto/create-order.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /************************************* Get User Profile *********************************/
  // Exclude keys from user

  async getUserProfile(userId: string): Promise<object> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new ConflictException("User Already Exists");

    return this.prisma.exclude(
      user,
      "hash",
      "hashedRt",
      "createdAt",
      "updatedAt",
      "role"
    );
  }

  /************************************* end *********************************************/

  // create item and add items & resturant in order
  async createOrder(
    userId: string,
    createOrderDto: CreateOrderDto
  ): Promise<object> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new ForbiddenException("User Not Found");

    // check items id exist in the resturant
    const items = await this.prisma.item.findMany({
      where: {
        id: {
          in: createOrderDto.items,
        },
      },
    });

    if (items.length !== createOrderDto.items.length)
      throw new ConflictException("Item Not Found");

    const order = await this.prisma.order.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        resturant: {
          connect: {
            id: createOrderDto.resturantId,
          },
        },
        items: {
          //check if item exist and ite for this resturant and connect it
          connect: createOrderDto.items.map((item) => ({
            id: item,
          })),
        },
      },
    });

    return order;
  }

  // delete one item from order by user
  // async deleteItemFromOrder(
  //   userId: string,
  //   orderId: string,
  //   itemId: string
  // ): Promise<object> {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //   });

  //   if (!user) throw new ForbiddenException("User Not Found");

  //   const order = await this.prisma.order.findUnique({
  //     where: {
  //       id: orderId,
  //     },
  //   });

  //   if (!order) throw new ForbiddenException("Order Not Found");

  //   const item = await this.prisma.item.findUnique({
  //     where: {
  //       id: itemId,
  //     },
  //   });

  //   if (!item) throw new ForbiddenException("Item Not Found");

  //   const orderItem = await this.prisma.orderItem.findMany({
  //     where: {
  //       order: {
  //         id: orderId,
  //       },
  //       item: {
  //         id: itemId,
  //       },
  //     },
  //   });

  //   if (!orderItem) throw new ForbiddenException("Item Not Found");

  //   const deletedOrderItem = await this.prisma.orderItem.delete({
  //     where: {
  //       id: orderItem[0].id,
  //     },
  //   });

  //   return deletedOrderItem;
  // }

  // get user orders with order items and rersturant
  async getUserOrders(userId: string): Promise<object> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new ForbiddenException("User Not Found");

    const orders = await this.prisma.order.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      include: {
        items: true,
        resturant: true,
      },
    });

    return orders;
  }
}
