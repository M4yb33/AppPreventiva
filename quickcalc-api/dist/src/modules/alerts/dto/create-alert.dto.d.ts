import { TriggerType } from '../../../common/enums';
export declare class CreateAlertDto {
    deviceUuid: string;
    triggerType: TriggerType;
    latitude: number;
    longitude: number;
    accuracy?: number;
}
