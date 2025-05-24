import { Repository, EntityTarget, DataSource, FindOptionsWhere, DeepPartial } from 'typeorm';
import { IBaseRepository } from './base.repository';
import { NotFoundError } from '../middlewares/errors/error.types';

export abstract class BaseRepository<T extends { id: number }> implements IBaseRepository<T> {
    protected repository: Repository<T>;

    constructor(
        protected entity: EntityTarget<T>,
        protected dataSource: DataSource
    ) {
        this.repository = dataSource.getRepository(entity);
    }

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<T | null> {
        const entity = await this.repository.findOne({
            where: { id } as FindOptionsWhere<T>
        });

        if (!entity) {
            throw new NotFoundError('Kayıt bulunamadı');
        }
        return entity;
    }

    async create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return await this.repository.save(entity);
    }

    async update(id: number, data: DeepPartial<T>): Promise<T> {
        const entity = await this.findById(id);
        if (!entity) {
            throw new NotFoundError('Kayıt bulunamadı');
        }

        Object.assign(entity, data);
        return await this.repository.save(entity);
    }

    async delete(id: number): Promise<void> {
        const entity = await this.findById(id);
        if (!entity) {
            throw new NotFoundError('Kayıt bulunamadı');
        }

        await this.repository.remove(entity);
    }
}
