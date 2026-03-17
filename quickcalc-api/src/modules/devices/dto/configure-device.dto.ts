import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class ConfigureDeviceDto {
  @IsOptional()
  @IsString()
  alias?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'Panic code must be at least 4 characters' })
  panicCode: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'Settings code must be at least 4 characters' })
  settingsCode: string;
}
