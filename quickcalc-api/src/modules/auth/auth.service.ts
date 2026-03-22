import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find operator
    const operator = await this.prisma.opr_operators.findUnique({
      where: { opr_email: email },
    });

    if (!operator) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if operator is active
    if (!operator.opr_is_active) {
      throw new UnauthorizedException('Account is inactive');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, operator.opr_password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
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

  async validateUser(userId: number) {
    const operator = await this.prisma.opr_operators.findUnique({
      where: { opr_id: userId },
    });

    if (!operator || !operator.opr_is_active) {
      throw new UnauthorizedException('Invalid user');
    }

    return {
      id: operator.opr_id,
      fullName: operator.opr_full_name,
      email: operator.opr_email,
      role: operator.opr_role,
    };
  }

  async getProfile(userId: number) {
    const operator = await this.prisma.opr_operators.findUnique({
      where: { opr_id: userId },
    });

    if (!operator) {
      throw new UnauthorizedException('User not found');
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
}
