import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseApiError } from 'src/tools/baseApiError';

import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators';
import { RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { TokensEntity } from './entity';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /* :::::::::::::::::::::::::::: register users :::::::::::::::::::::::::::: */

  @Public()
  @ApiTags('user')
  @ApiOperation({
    summary: 'register for users',
  })
  @ApiCreatedResponse({
    type: TokensEntity,
    description: ' When evrithing is Ok you recive Tokens',
  })
  @ApiConflictResponse({
    description: 'User already exists',
  })
  @UsePipes(ValidationPipe)
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  /* ::::::::::::::::::::::::::::::: End :::::::::::::::::::::::::::::::::::::::: */

  /* :::::::::::::::::::::::::::: Login with local :::::::::::::::::::::::::::: */

  @Public()
  @ApiTags('user', 'admin')
  @ApiOperation({
    summary: 'login for all users',
  })
  @ApiCreatedResponse({
    type: TokensEntity,
    description: ' When evrithing is Ok you recive Tokens',
  })
  @ApiConflictResponse({
    description: 'User Not exists',
  })
  @UsePipes(ValidationPipe)
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: LoginDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  /* ::::::::::::::::::::::::::::::: End :::::::::::::::::::::::::::::::::::::::: */

  /* :::::::::::::::::::::::::::: Logout Users ::::::::::::::::::::::::::::::::: */
  @ApiTags('user', 'admin')
  @ApiOperation({
    summary: 'login for all users',
  })
  @ApiCreatedResponse({
    type: Boolean,
    description: ' When evrithing is Ok you recive true',
  })
  @ApiConflictResponse({
    description: 'User Not exists',
  })
  @ApiBearerAuth()
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  /* ::::::::::::::::::::::::::::::: End :::::::::::::::::::::::::::::::::::::::: */

  /* :::::::::::::::::::::::::::: Request for recive new token :::::::::::::::::::::::::::: */

  @Public()
  @UseGuards(RtGuard)
  @ApiTags('user', 'admin')
  @ApiOperation({
    summary: 'new token token for all users',
  })
  @ApiCreatedResponse({
    type: TokensEntity,
    description: ' When evrithing is Ok you recive Tokens',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  /* ::::::::::::::::::::::::::::::: End :::::::::::::::::::::::::::::::::::::::: */
}
