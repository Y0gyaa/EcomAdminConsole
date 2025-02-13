"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendModule = void 0;
const common_1 = require("@nestjs/common");
const backend_service_1 = require("./backend.service");
const backend_controller_1 = require("./backend.controller");
const typeorm_1 = require("@nestjs/typeorm");
const backend_entity_1 = require("./backend.entity");
const platform_express_1 = require("@nestjs/platform-express");
let BackendModule = class BackendModule {
};
exports.BackendModule = BackendModule;
exports.BackendModule = BackendModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                dest: "./uploads",
            }),
            typeorm_1.TypeOrmModule.forFeature([backend_entity_1.Backend]),
        ],
        providers: [backend_service_1.BackendService],
        controllers: [backend_controller_1.BackendController],
    })
], BackendModule);
//# sourceMappingURL=backend.module.js.map