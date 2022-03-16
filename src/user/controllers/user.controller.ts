import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Roles, RolesGuard } from "src/auth/tools";

import {
  Public,
  GetCurrentUserId,
  GetCurrentUser,
} from "../../common/decorators";
import { CreateOrderDto } from "../dto/create-order.dto";
import { UserService } from "../services/user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  /**************************** Get User Profile *****************************/

  @ApiTags("user")
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedException,
  })
  @ApiOperation({
    summary: "cancel reservation by owner",
    description: "cancel reservation by owner",
  })
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles("USER")
  @ApiBearerAuth()
  @Post("profile")
  @HttpCode(HttpStatus.OK)
  getUserProfile(@GetCurrentUserId() userId: string): Promise<object> {
    return this.userService.getUserProfile(userId);
  }
  /**************************** end ****************************************/

  // create order with users
  @ApiTags("user")
  @ApiOperation({
    summary: "create order with users",
    description: "create order with users",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedException,
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles("USER")
  @Post("order")
  @HttpCode(HttpStatus.OK)
  createOrder(
    @GetCurrentUserId() userId: string,
    @Body() createOrderDto: CreateOrderDto
  ): Promise<object> {
    return this.userService.createOrder(userId, createOrderDto);
  }

  // delete one item in order by user
  // @ApiTags("user")
  // @ApiOperation({
  //   summary: "delete one item in order by user",
  //   description: "delete one item in order by user",

  // })
  // @ApiResponse({
  //   status: HttpStatus.UNAUTHORIZED,
  //   type: UnauthorizedException,
  // })
  // @ApiBearerAuth()
  // @UsePipes(ValidationPipe)
  // @UseGuards(RolesGuard)
  // @Roles("USER")
  // @Delete("order/item/:id")
  // @HttpCode(HttpStatus.OK)
  // deleteItemInOrder(
  //   @GetCurrentUserId() userId: string,
  //   @Param('id') id: string
  // ): Promise<object> {
  //   return this.userService.deleteItemInOrder(userId, id);
  // }

  // get user orders and items
  @ApiTags("user")
  @ApiOperation({
    summary: "get user orders and items",
    description: "get user orders and items",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedException,
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles("USER")
  @Get("orders")
  @HttpCode(HttpStatus.OK)
  getUserOrders(@GetCurrentUserId() userId: string): Promise<object> {
    return this.userService.getUserOrders(userId);
  }
}
