import { DeepPartial } from 'typeorm';

export interface IBaseRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(data: DeepPartial<T>): Promise<T>;
    update(id: number, data: DeepPartial<T>): Promise<T>;
    delete(id: number): Promise<void>;
}
