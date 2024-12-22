import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateMenuDto {
    @IsNotEmpty()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    parentId?: string;
  
    @IsOptional()
    @IsInt()
    depth?: number;
  }
  