import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { TriggerType } from '../../../common/enums';

export class CreateAlertDto {
  @IsString()
  @IsNotEmpty()
  deviceUuid: string;

  @IsEnum(TriggerType)
  triggerType: TriggerType;

  @IsOptional()
  @IsString()
  alias?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsNumber()
  accuracy?: number;
}
