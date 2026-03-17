import { PrismaService } from '../../prisma/prisma.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
export declare class OperatorsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    getOperatorById(operatorId: number): Promise<{
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
