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
exports.BackendController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const backend_service_1 = require("./backend.service");
let BackendController = class BackendController {
    constructor(backendService) {
        this.backendService = backendService;
    }
    findAllIds() {
        return this.backendService.findAllIds();
    }
    findAll() {
        return this.backendService.findAll();
    }
    findOne(id) {
        return this.backendService.findOne(Number(id));
    }
    create(product) {
        return this.backendService.create(product);
    }
    upload(file) {
        if (!file) {
            throw new Error("No file uploaded");
        }
        return { images: file.filename };
    }
    update(id, product) {
        return this.backendService.update(Number(id), product);
    }
    updateProductField(id, updateData) {
        if (!updateData.field || updateData.value === undefined) {
            throw new Error("Field and value are required");
        }
        return this.backendService.updateField(id, updateData.field, updateData.value);
    }
    remove(id) {
        return this.backendService.remove(Number(id));
    }
};
exports.BackendController = BackendController;
__decorate([
    (0, common_1.Get)("/all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BackendController.prototype, "findAllIds", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BackendController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BackendController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BackendController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("uploads"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BackendController.prototype, "upload", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BackendController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(":id/field"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], BackendController.prototype, "updateProductField", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BackendController.prototype, "remove", null);
exports.BackendController = BackendController = __decorate([
    (0, common_1.Controller)("products"),
    __metadata("design:paramtypes", [backend_service_1.BackendService])
], BackendController);
//# sourceMappingURL=backend.controller.js.map