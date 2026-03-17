import { Controller, Post, Get, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OperatorsService } from './operators.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { OperatorRole } from '../../common/enums';

@Controller('operators')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) { }

  @Post()
  @Roles(OperatorRole.ADMIN)
  async createOperator(@Body() createOperatorDto: CreateOperatorDto) {
    return this.operatorsService.createOperator(createOperatorDto);
  }

  @Get()
  @Roles(OperatorRole.ADMIN, OperatorRole.OPERATOR)
  async getAllOperators() {
    return this.operatorsService.getAllOperators();
  }

  @Get(':id')
  @Roles(OperatorRole.ADMIN, OperatorRole.OPERATOR)
  async getOperatorById(@Param('id', ParseIntPipe) id: number) {
    return this.operatorsService.getOperatorById(id);
  }
}
