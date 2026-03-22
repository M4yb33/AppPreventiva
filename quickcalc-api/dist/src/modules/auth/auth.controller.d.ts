import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    getProfile(user: any): Promise<{
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
