<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## API Documentation

This project includes a comprehensive API for managing menus, built with TypeScript, Prisma, PostgreSQL, and deployed using Railway. You can view the live API documentation at the following URL:

[API Documentation](https://menu-management-backend-production.up.railway.app/api)

### Example API Implementation

```typescript
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

  @Get()
  @ApiOperation({ summary: 'Retrieve all menus' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the list of menus', type: [Menu] })
  async findAll() {
    const menus = await this.menusService.findAll();
    return { message: 'Menus fetched successfully', data: menus };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a menu by its ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the menu', type: Menu })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  async findOne(@Param('id') id: string) {
    const menu = await this.menusService.findOne(id);
    return { message: 'Menu fetched successfully', data: menu };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiBody({
    description: 'Provide the necessary data to create a new menu.',
    type: CreateMenuDto,
    examples: {
      example1: { value: { name: 'Main Haidar', parentId: null } },
      example2: { value: { name: 'Root Menu', parentId: null } },
    },
  })
  @ApiResponse({ status: 201, description: 'Menu successfully created', type: Menu })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createMenuDto: CreateMenuDto) {
    const createdMenu = await this.menusService.create(createMenuDto);
    return { message: 'Menu created successfully', data: createdMenu };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing menu' })
  @ApiBody({
    description: 'Provide the data to update the menu.',
    type: UpdateMenuDto,
    examples: {
      example1: { value: { name: 'Updated Menu', parentId: '9dca3ad3-0840-4d68-bc23-3f7017e3107f' } },
    },
  })
  @ApiResponse({ status: 200, description: 'Menu successfully updated', type: Menu })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    const updatedMenu = await this.menusService.update(id, updateMenuDto);
    return { message: 'Menu updated successfully', data: updatedMenu };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu' })
  @ApiResponse({ status: 200, description: 'Menu successfully deleted' })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  async remove(@Param('id') id: string) {
    await this.menusService.remove(id);
    return { message: 'Menu deleted successfully' };
  }
}
```

## Developer Notes

This project was developed and maintained by **Muhammad Haidar Shahab**, a seasoned Full Stack Developer passionate about building robust and scalable applications. For more information or inquiries, feel free to connect:

- **Email**: haidarmuhammad312@gmail.com
- **LinkedIn**: [Muhammad Haidar Shahab](https://www.linkedin.com/in/mhaidarshahab/)

Happy coding! 🚀
