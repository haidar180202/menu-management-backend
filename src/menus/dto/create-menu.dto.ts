import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string; // Nama menu, wajib diisi dan harus berupa string

  @IsOptional()
  @IsString()
  parentId?: string; // ID parent menu, opsional, dan harus berupa string jika ada

  @IsOptional()
  @IsInt()
  depth?: number; // Kedalaman menu, opsional, dan harus berupa integer jika ada
}
