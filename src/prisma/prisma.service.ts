import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super(); // Panggil konstruktor PrismaClient
  }

  async onModuleInit() {
    // Koneksi Prisma ke database
    await this.$connect();
    console.log('Prisma connected to the database');
  }

  async onModuleDestroy() {
    // Tutup koneksi Prisma saat aplikasi berhenti
    await this.$disconnect();
    console.log('Prisma disconnected from the database');
  }
}
