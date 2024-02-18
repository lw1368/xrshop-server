import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Brand } from './models/brand.entity';

@Injectable()
export class BrandService {
    constructor(@InjectRepository(Brand) private BrandRepository: Repository<Brand>) {}

    // 新增
    async create(entity: DeepPartial<Brand>): Promise<boolean> {
        const res = await this.BrandRepository.insert(entity);
        if (res && res.raw.affectedRows > 0) {
            return true;
        }
        return false;
    }

    // 删除
    async del(id: string[]): Promise<boolean> {
        const res = await this.BrandRepository.delete(id);
        if (res.affected > 0) {
            return true;
        }
        return false;
    }

    // 更新
    async update(id: string, entity: DeepPartial<Brand>): Promise<boolean> {
        const res = await this.BrandRepository.update(id, entity);
        if (res.affected > 0) {
            return true;
        }
        return false;
    }

    // 查询
    async find(id: number): Promise<Brand> {
        const res = await this.BrandRepository.findOne({
            where: {
                id,
            },
        });
        return res;
    }

    // 查询用户列表
    async list({ start, length }: { start: number; length: number }): Promise<[Brand[], number]> {
        return this.BrandRepository.findAndCount({
            take: length,
            skip: start,
            // order: {
            //     createdAt: 'DESC',
            // },
        });
    }
}
