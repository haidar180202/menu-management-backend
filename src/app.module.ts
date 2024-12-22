import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [PrismaModule, MenusModule], // Tambahkan PrismaModule
})
export class AppModule {}
