import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        message: string;
        data: {
            accessToken: string;
            operator: {
                id: number;
                fullName: string;
                email: string;
                role: import(".prisma/client").$Enums.OperatorRole;
            };
        };
    }>;
    validateUser(userId: number): Promise<{
        id: number;
        fullName: string;
        email: string;
        role: import(".prisma/client").$Enums.OperatorRole;
    }>;
    getProfile(userId: number): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            fullName: string;
            email: string;
            role: import(".prisma/client").$Enums.OperatorRole;
            createdAt: Date;
        };
    }>;
}
