import { OperatorsService } from './operators.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
export declare class OperatorsController {
    private readonly operatorsService;
    constructor(operatorsService: OperatorsService);
    createOperator(createOperatorDto: CreateOperatorDto): Promise<{
        success: boolean;
        message: string;
        data: {
            operatorId: number;
            fullName: string;
            email: string;
            role: import(".prisma/client").$Enums.OperatorRole;
        };
    }>;
    getAllOperators(): Promise<{
        success: boolean;
        message: string;
        data: {
            operatorId: number;
            fullName: string;
            email: string;
            role: import(".prisma/client").$Enums.OperatorRole;
            isActive: boolean;
            createdAt: Date;
        }[];
    }>;
    getOperatorById(id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            operatorId: number;
            fullName: string;
            email: string;
            role: import(".prisma/client").$Enums.OperatorRole;
            isActive: boolean;
            createdAt: Date;
        };
    }>;
}
