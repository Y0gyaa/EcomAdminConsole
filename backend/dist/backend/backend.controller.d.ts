import { BackendService } from './backend.service';
import { Backend } from './backend.entity';
export declare class BackendController {
    backendService: BackendService;
    constructor(backendService: BackendService);
    findAll(): Promise<Backend[]>;
    findOne(id: string): Promise<Backend | null>;
    create(product: Partial<Backend>): Promise<Partial<Backend> & Backend>;
    upload(file: Express.Multer.File): {
        filePath: string;
    };
    update(id: string, product: Partial<Backend>): Promise<Backend | null>;
    updateProductField(id: number, updateData: {
        field: string;
        value: unknown;
    }): Promise<Backend | null>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
