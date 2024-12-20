import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  parentId?: string;

  @IsOptional()
  @IsInt()
  depth?: number;
}
