import { TriggerType } from '../../../common/enums';
export declare class CreateAlertDto {
    deviceUuid: string;
    triggerType: TriggerType;
    alias?: string;
    latitude?: number;
    longitude?: number;
    accuracy?: number;
}
