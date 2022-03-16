import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { ItemService } from "./item.service";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Roles, RolesGuard } from "src/auth/tools";
import { Public, GetCurrentUserId } from "../common/decorators";
import { ItemEntity } from "./entities/item.entity";

@Controller("item")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiTags("user")
  @ApiOperation({
    summary: "add resturant by owner",
  })
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles("USER")
  @ApiBearerAuth()
  @Post()
  create(
    @GetCurrentUserId() userId: string,
    @Body() createItemDto: CreateItemDto
  ): Promise<ItemEntity> {
    return this.itemService.create(createItemDto);
  }

  @ApiTags("user")
  @ApiOperation({
    summary: "find all items",
  })
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles("USER")
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.itemService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
  //   return this.itemService.update(+id, updateItemDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.itemService.remove(+id);
  // }
}
