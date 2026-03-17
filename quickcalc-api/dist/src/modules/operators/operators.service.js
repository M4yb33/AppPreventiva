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
exports.OperatorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcrypt");
let OperatorsService = class OperatorsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOperator(createOperatorDto) {
        const { fullName, email, password, role } = createOperatorDto;
        const existingOperator = await this.prisma.opr_operators.findUnique({
            where: { opr_email: email },
        });
        if (existingOperator) {
            throw new common_1.ConflictException('Operator with this email already exists');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const operator = await this.prisma.opr_operators.create({
            data: {
                opr_full_name: fullName,
                opr_email: email,
                opr_password_hash: passwordHash,
                opr_role: role || 'OPERATOR',
                opr_is_active: true,
            },
        });
        return {
            success: true,
            message: 'Operator created successfully',
            data: {
                operatorId: operator.opr_id,
                fullName: operator.opr_full_name,
                email: operator.opr_email,
                role: operator.opr_role,
            },
        };
    }
    async getAllOperators() {
        const operators = await this.prisma.opr_operators.findMany({
            orderBy: { opr_created_at: 'desc' },
        });
        return {
            success: true,
            message: 'Operators retrieved successfully',
            data: operators.map((operator) => ({
                operatorId: operator.opr_id,
                fullName: operator.opr_full_name,
                email: operator.opr_email,
                role: operator.opr_role,
                isActive: operator.opr_is_active,
                createdAt: operator.opr_created_at,
            })),
        };
    }
    async getOperatorById(operatorId) {
        const operator = await this.prisma.opr_operators.findUnique({
            where: { opr_id: operatorId },
        });
        if (!operator) {
            throw new common_1.NotFoundException('Operator not found');
        }
        return {
            success: true,
            message: 'Operator retrieved successfully',
            data: {
                operatorId: operator.opr_id,
                fullName: operator.opr_full_name,
                email: operator.opr_email,
                role: operator.opr_role,
                isActive: operator.opr_is_active,
                createdAt: operator.opr_created_at,
            },
        };
    }
};
exports.OperatorsService = OperatorsService;
exports.OperatorsService = OperatorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OperatorsService);
//# sourceMappingURL=operators.service.js.map