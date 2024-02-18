import { Controller, Get } from '@nestjs/common';

import { User } from './modules/users/models/user.entity';
import { UserService } from './modules/users/user.service';

@Controller()
export class AppController {
    constructor(private readonly userService: UserService) {}

    @Get('/create')
    async create(): Promise<boolean> {
        return this.userService.create({
            name: '水滴超级管理员',
            desc: '管理员',
            phone: '8800888',
        });
    }

    @Get('/del')
    async del(): Promise<boolean> {
        return this.userService.del(['0d56828d-5b72-47c3-955a-f76caf4793f2']);
    }

    @Get('/update')
    async update(): Promise<boolean> {
        return this.userService.update('cb71e40d-9f15-40ef-a137-1acaa38831f4', {
            name: '水滴超级管理员11111',
        });
    }

    @Get('/find')
    async find(): Promise<User> {
        return this.userService.find('cb71e40d-9f15-40ef-a137-1acaa38831f4');
    }
}
