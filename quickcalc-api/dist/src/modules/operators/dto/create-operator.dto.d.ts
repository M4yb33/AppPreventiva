import { OperatorRole } from '../../../common/enums';
export declare class CreateOperatorDto {
    fullName: string;
    email: string;
    password: string;
    role?: OperatorRole;
}
