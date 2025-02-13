import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Backend } from "./backend.entity";

@Injectable()
export class BackendService {
  constructor(
    @InjectRepository(Backend)
    private backendRepository: Repository<Backend>,
  ) {}

  async findAllIds() {
    const users = await this.backendRepository.find({ select: ["id"] });
    const ids = users.map((user) => user.id);
    return { id: ids };
  }

  findAll() {
    return this.backendRepository.find();
  }

  findOne(id: number) {
    return this.backendRepository.findOneBy({ id });
  }

  create(product: Partial<Backend>) {
    return this.backendRepository.save(product);
  }

  async update(id: number, product: Partial<Backend>) {
    await this.backendRepository.update(id, product);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.backendRepository.delete(id);
    return { deleted: true };
  }

  async updateField(id: number, field: string, value: Backend[keyof Backend]) {
    const b = this.toEntityKey(field);
    await this.backendRepository.update(id, { [b]: value });
    return { message: `Field ${field} updated successfully.` };
  }

  private toEntityKey<Backend>(key: string): keyof Backend {
    return key as keyof Backend;
  }
}
