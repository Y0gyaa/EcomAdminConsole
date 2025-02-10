import { Repository } from 'typeorm';
import { Backend } from './backend.entity';
export declare class BackendService {
    private backendRepository;
    constructor(backendRepository: Repository<Backend>);
    findAll(): Promise<Backend[]>;
    findOne(id: number): Promise<Backend | null>;
    create(product: Partial<Backend>): Promise<Partial<Backend> & Backend>;
    update(id: number, product: Partial<Backend>): Promise<Backend | null>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
    updateField(id: number, field: keyof Backend, value: Backend[keyof Backend]): Promise<{
        message: string;
    }>;
}
