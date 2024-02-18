import { Controller, Get, Param, Post } from '@nestjs/common';

import { BrandService } from './brand.service';
import { Brand } from './models/brand.entity';

@Controller('/brands')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Get('/find')
    async find(): Promise<Brand> {
        return this.brandService.find(1);
    }

    @Post('/create')
    async create(): Promise<boolean> {
        return this.brandService.create({
            name: '1',
        });
    }

    @Post('/update')
    async update(): Promise<boolean> {
        return this.brandService.update('cb71e40d-9f15-40ef-a137-1acaa38831f4', {
            name: '水滴超级管理员11111',
        });
    }

    @Post('/del')
    async del(@Param('ids') ids: string): Promise<boolean> {
        return this.brandService.del(JSON.parse(ids));
    }
}
