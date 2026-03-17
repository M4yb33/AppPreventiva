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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const operators_service_1 = require("./operators.service");
const create_operator_dto_1 = require("./dto/create-operator.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const roles_guard_1 = require("../../common/guards/roles.guard");
const enums_1 = require("../../common/enums");
let OperatorsController = class OperatorsController {
    constructor(operatorsService) {
        this.operatorsService = operatorsService;
    }
    async createOperator(createOperatorDto) {
        return this.operatorsService.createOperator(createOperatorDto);
    }
    async getAllOperators() {
        return this.operatorsService.getAllOperators();
    }
    async getOperatorById(id) {
        return this.operatorsService.getOperatorById(id);
    }
};
exports.OperatorsController = OperatorsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.OperatorRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_operator_dto_1.CreateOperatorDto]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "createOperator", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(enums_1.OperatorRole.ADMIN, enums_1.OperatorRole.OPERATOR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "getAllOperators", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.OperatorRole.ADMIN, enums_1.OperatorRole.OPERATOR),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "getOperatorById", null);
exports.OperatorsController = OperatorsController = __decorate([
    (0, common_1.Controller)('operators'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [operators_service_1.OperatorsService])
], OperatorsController);
//# sourceMappingURL=operators.controller.js.map