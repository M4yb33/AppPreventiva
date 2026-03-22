import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { AlertStatus } from '../../../common/enums';

export class UpdateAlertStatusDto {
  @IsEnum(AlertStatus)
  status: AlertStatus;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  performedBy?: string;
}
