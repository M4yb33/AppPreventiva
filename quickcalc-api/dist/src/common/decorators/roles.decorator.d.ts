import { OperatorRole } from '../enums';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: OperatorRole[]) => import("@nestjs/common").CustomDecorator<string>;
