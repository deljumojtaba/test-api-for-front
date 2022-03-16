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
  Put,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Roles, RolesGuard } from "src/auth/tools";
import { ResturantService } from "./resturant.service";
import { CreateResturantDto } from "./dto/create-resturant.dto";
import { UpdateResturantDto } from "./dto/update-resturant.dto";
import { ResturantEntity } from "./entities/resturant.entity";
import { Public, GetCurrentUserId } from "../common/decorators";
import { AddItemToResturantDto } from "./dto/add-item-to-restorant.dto";

@Controller("resturant")
export class ResturantController {
  constructor(private readonly resturantService: ResturantService) {}

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
    @Body() createResturantDto: CreateResturantDto
  ): Promise<ResturantEntity> {
    return this.resturantService.create(createResturantDto);
  }

  @ApiTags("user")
  @ApiOperation({
    summary: "get all resturant",
  })
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles("USER")
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.resturantService.findAll();
  }

  @ApiTags("user")
  @ApiOperation({
    summary: "add item to resturant",
  })
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles("USER")
  @ApiBearerAuth()
  @Put("item/:id")
  addItemToResturant(
    @GetCurrentUserId() userId: string,
    @Body() addItemToResturantDto: AddItemToResturantDto
  ): Promise<ResturantEntity> {
    return this.resturantService.addItemToResturant(
      addItemToResturantDto,
      userId
    );
  }

  @ApiTags("user")
  @ApiOperation({
    summary: "get resturant with items",
  })
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles("USER")
  @ApiBearerAuth()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.resturantService.findOne(id);
  }

  // @Patch(":id")
  // update(
  //   @Param("id") id: string,
  //   @Body() updateResturantDto: UpdateResturantDto
  // ) {
  //   return this.resturantService.update(+id, updateResturantDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.resturantService.remove(+id);
  // }
}
