"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const operator = await this.prisma.opr_operators.findUnique({
            where: { opr_email: email },
        });
        if (!operator) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!operator.opr_is_active) {
            throw new common_1.UnauthorizedException('Account is inactive');
        }
        const isPasswordValid = await bcrypt.compare(password, operator.opr_password_hash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: operator.opr_id,
            email: operator.opr_email,
            role: operator.opr_role,
        };
        const accessToken = this.jwtService.sign(payload);
        return {
            success: true,
            message: 'Login successful',
            data: {
                accessToken,
                operator: {
                    id: operator.opr_id,
                    fullName: operator.opr_full_name,
                    email: operator.opr_email,
                    role: operator.opr_role,
                },
            },
        };
    }
    async validateUser(userId) {
        const operator = await this.prisma.opr_operators.findUnique({
            where: { opr_id: userId },
        });
        if (!operator || !operator.opr_is_active) {
            throw new common_1.UnauthorizedException('Invalid user');
        }
        return {
            id: operator.opr_id,
            fullName: operator.opr_full_name,
            email: operator.opr_email,
            role: operator.opr_role,
        };
    }
    async getProfile(userId) {
        const operator = await this.prisma.opr_operators.findUnique({
            where: { opr_id: userId },
        });
        if (!operator) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return {
            success: true,
            message: 'Profile retrieved successfully',
            data: {
                id: operator.opr_id,
                fullName: operator.opr_full_name,
                email: operator.opr_email,
                role: operator.opr_role,
                createdAt: operator.opr_created_at,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map