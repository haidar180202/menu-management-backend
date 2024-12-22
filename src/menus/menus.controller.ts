import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Menu } from './entities/menu.entity';

@ApiTags('Menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  // Endpoint untuk mendapatkan semua menu
  @Get()
  @ApiOperation({ summary: 'Retrieve all menus' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the list of menus', type: [Menu] })
  async findAll() {
    const menus = await this.menusService.findAll();
    return { message: 'Menus fetched successfully', data: menus };
  }

  // Endpoint untuk mendapatkan menu berdasarkan ID
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a menu by its ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the menu', type: Menu })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  async findOne(@Param('id') id: string) {
    const menu = await this.menusService.findOne(id);
    return { message: 'Menu fetched successfully', data: menu };
  }

  // Endpoint untuk membuat menu baru
  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiBody({
    description: 'Provide the necessary data to create a new menu. If a parentId is provided, the depth will be calculated automatically.',
    type: CreateMenuDto,
    examples: {
      example1: {
        value: {
          name: 'Main Haidar',
          parentId: null, // Menu induk
        },
      },
      example2: {
        value: {
          name: 'Root Menu',
          parentId: null, // Menu root, depth otomatis 1
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Menu successfully created', type: Menu })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createMenuDto: CreateMenuDto) {
    const createdMenu = await this.menusService.create(createMenuDto);
    return { message: 'Menu created successfully', data: createdMenu };
  }

  // Endpoint untuk mengupdate menu yang sudah ada
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing menu' })
  @ApiBody({
    description: 'Provide the data to update the menu. Depth is calculated automatically and should not be manually modified.',
    type: UpdateMenuDto,
    examples: {
      example1: {
        value: {
          name: 'Updated Menu',
          parentId: '9dca3ad3-0840-4d68-bc23-3f7017e3107f', // ID parent baru
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Menu successfully updated', type: Menu })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    const updatedMenu = await this.menusService.update(id, updateMenuDto);
    return { message: 'Menu updated successfully', data: updatedMenu };
  }

  // Endpoint untuk menghapus menu berdasarkan ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu' })
  @ApiResponse({ status: 200, description: 'Menu successfully deleted' })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  async remove(@Param('id') id: string) {
    await this.menusService.remove(id);
    return { message: 'Menu deleted successfully' };
  }
}
