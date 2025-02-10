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
exports.BackendService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const backend_entity_1 = require("./backend.entity");
let BackendService = class BackendService {
    constructor(backendRepository) {
        this.backendRepository = backendRepository;
    }
    findAll() {
        return this.backendRepository.find();
    }
    findOne(id) {
        return this.backendRepository.findOneBy({ id });
    }
    create(product) {
        return this.backendRepository.save(product);
    }
    async update(id, product) {
        await this.backendRepository.update(id, product);
        return this.findOne(id);
    }
    async remove(id) {
        await this.backendRepository.delete(id);
        return { deleted: true };
    }
    async updateField(id, field, value) {
        const updateObject = { [field]: value };
        await this.backendRepository.update(id, updateObject);
        return { message: `Field ${field} updated successfully.` };
    }
};
exports.BackendService = BackendService;
exports.BackendService = BackendService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(backend_entity_1.Backend)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BackendService);
//# sourceMappingURL=backend.service.js.map