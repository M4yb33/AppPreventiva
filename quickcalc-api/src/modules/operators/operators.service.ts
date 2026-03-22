import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OperatorsService {
  constructor(private prisma: PrismaService) { }

  async createOperator(createOperatorDto: CreateOperatorDto) {
    const { fullName, email, password, role } = createOperatorDto;

    // Check if operator with email already exists
    const existingOperator = await this.prisma.opr_operators.findUnique({
      where: { opr_email: email },
    });

    if (existingOperator) {
      throw new ConflictException('Operator with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create operator
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

  async getOperatorById(operatorId: number) {
    const operator = await this.prisma.opr_operators.findUnique({
      where: { opr_id: operatorId },
    });

    if (!operator) {
      throw new NotFoundException('Operator not found');
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
}
