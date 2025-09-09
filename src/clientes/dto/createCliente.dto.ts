import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
