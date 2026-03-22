import { AlertStatus } from '../../../common/enums';
export declare class UpdateAlertStatusDto {
    status: AlertStatus;
    note?: string;
    performedBy?: string;
}
