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
exports.DevicesController = void 0;
const common_1 = require("@nestjs/common");
const devices_service_1 = require("./devices.service");
const register_device_dto_1 = require("./dto/register-device.dto");
const configure_device_dto_1 = require("./dto/configure-device.dto");
const add_trusted_contact_dto_1 = require("./dto/add-trusted-contact.dto");
let DevicesController = class DevicesController {
    constructor(devicesService) {
        this.devicesService = devicesService;
    }
    async registerDevice(registerDeviceDto) {
        return this.devicesService.registerDevice(registerDeviceDto);
    }
    async configureDevice(id, configureDeviceDto) {
        return this.devicesService.configureDevice(id, configureDeviceDto);
    }
    async addTrustedContact(id, addTrustedContactDto) {
        return this.devicesService.addTrustedContact(id, addTrustedContactDto);
    }
    async getTrustedContacts(id) {
        return this.devicesService.getTrustedContacts(id);
    }
};
exports.DevicesController = DevicesController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_device_dto_1.RegisterDeviceDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "registerDevice", null);
__decorate([
    (0, common_1.Patch)(':id/configuration'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, configure_device_dto_1.ConfigureDeviceDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "configureDevice", null);
__decorate([
    (0, common_1.Post)(':id/contacts'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, add_trusted_contact_dto_1.AddTrustedContactDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "addTrustedContact", null);
__decorate([
    (0, common_1.Get)(':id/contacts'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "getTrustedContacts", null);
exports.DevicesController = DevicesController = __decorate([
    (0, common_1.Controller)('devices'),
    __metadata("design:paramtypes", [devices_service_1.DevicesService])
], DevicesController);
//# sourceMappingURL=devices.controller.js.map