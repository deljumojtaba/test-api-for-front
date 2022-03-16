import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // pass PrismaClientOptions e.g. logging levels or error formatting
    super({ log: ['query', 'info', 'warn', 'error'] });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // add your custom methods here
  // exclude keys from models
  exclude(obj, ...keys) {
    const newObj = { ...obj };
    keys.forEach((key) => {
      delete newObj[key];
    });
    return newObj;
  }
}
