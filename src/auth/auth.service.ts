import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";

import { AuthDto, LoginDto } from "./dto";
import { JwtPayload, Tokens } from "./types";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  /********************************************* signup ***********************************************/

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    // split first name and last name from full name in dto
    const fullName = dto.fullName.split(" ");
    const firstName = fullName[0];
    const lastName = fullName[1];

    const user = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          hash,
          firstName,
          lastName,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new ConflictException("User Already Exists");
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  /********************************************* end ***********************************************/

  /****************************************** signin ********************************************/

  async signinLocal(dto: LoginDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException("Access Denied");

    const passwordMatches = await this.comparePassword(dto.password, user.hash);
    if (!passwordMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  /********************************************* end ***********************************************/

  /********************************************* logout ***********************************************/

  async logout(userId: string): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  /********************************************* end ***********************************************/

  /********************************************* refreshTokens ***********************************************/

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException("Access Denied");

    const rtMatches = await bcrypt.compare(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  /********************************************* end ***********************************************/

  /********************************************* updateRtHash ***********************************************/

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  /********************************************* end ***********************************************/

  /********************************************* getTokens ***********************************************/

  async getTokens(
    userId: string,
    email: string,
    role: string
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
      role: role,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("AT_SECRET"),
        expiresIn: "15m",
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("RT_SECRET"),
        expiresIn: "7d",
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  /********************************************* end ***********************************************/

  /****************************** hashData and comparePassword ****************************************/
  async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(data, salt);
    return hash;
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  /********************************************* end ***********************************************/
}
