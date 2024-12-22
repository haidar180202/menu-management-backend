import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}

  // Fungsi untuk menghitung depth berdasarkan parentId
  private async calculateDepth(parentId?: string): Promise<number> {
    if (!parentId) {
      return 1; // Jika tidak ada parentId, set depth ke 1
    }

    // Ambil data parent berdasarkan parentId
    const parentMenu = await this.prisma.menu.findUnique({
      where: { id: parentId },
    });

    if (!parentMenu) {
      throw new Error('Parent menu not found');
    }

    // Jika parent ditemukan, return depth parent + 1
    return parentMenu.depth + 1;
  }

  // Fungsi untuk mengambil anak-anak (children) secara rekursif
  private async getChildren(parentId: string) {
    // Ambil semua anak dari menu induk berdasarkan parentId
    const children = await this.prisma.menu.findMany({
      where: {
        parentId: parentId,
      },
      include: {
        children: true, // Mengambil children jika ada
      },
    });

    // Loop untuk memastikan anak-anak ini juga memiliki children
    for (const child of children) {
      child.children = await this.getChildren(child.id); // Rekursi untuk mengambil anak-anak dari setiap child
    }

    return children;
  }

  // Find All Menus dengan struktur parent-child
  async findAll() {
    const menus = await this.prisma.menu.findMany({
      where: {
        parentId: null, // Hanya ambil menu yang tidak punya parent (menu induk)
      },
      include: {
        children: true, // Menambahkan relasi children jika diperlukan
      },
    });

    // Strukturkan menu menjadi parent dan children dengan benar
    for (const menu of menus) {
      menu.children = await this.getChildren(menu.id); // Mengambil anak-anak secara rekursif
    }

    return menus;
  }

  // Find One Menu by ID
  async findOne(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        children: true, // Jika ingin mendapatkan children juga
      },
    });

    if (!menu) {
      throw new Error('Menu not found');
    }

    // Pastikan children dari menu ditampilkan dengan jelas
    menu.children = await this.getChildren(menu.id); // Mengambil anak-anak secara rekursif

    return menu;
  }

  // Create a New Menu
  async create(createMenuDto: CreateMenuDto) {
    // Menghitung depth sebelum membuat menu
    const depth = await this.calculateDepth(createMenuDto.parentId);

    return this.prisma.menu.create({
      data: {
        name: createMenuDto.name,
        parentId: createMenuDto.parentId || null, // Jika parentId null, maka item akan menjadi root
        depth, // Menggunakan depth yang dihitung otomatis
      },
    });
  }

  // Update a Menu by ID
  async update(id: string, updateMenuDto: UpdateMenuDto) {
    // Menghitung depth baru jika parentId diubah
    const depth = await this.calculateDepth(updateMenuDto.parentId);

    return this.prisma.menu.update({
      where: { id },
      data: {
        name: updateMenuDto.name,
        parentId: updateMenuDto.parentId || null, // Update parentId jika ada
        depth, // Menggunakan depth yang dihitung otomatis
      },
    });
  }

  // Remove a Menu by ID
  async remove(id: string) {
    return this.prisma.menu.delete({
      where: { id },
    });
  }
}
