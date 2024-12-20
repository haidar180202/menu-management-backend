import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.menu.findMany({
      include: {
        children: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: {
        children: true,
      },
    });
  }

  async create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  async remove(id: string) {
    return this.prisma.menu.delete({
      where: { id },
    });
  }
}
