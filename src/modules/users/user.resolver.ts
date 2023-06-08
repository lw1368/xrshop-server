import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SUCCESS, UPDATE_ERROR } from '@/common/constants/code';
import { Result } from '@/common/dto/result.type';

import { UserType } from './dto/user.dto';
import { UserInput } from './dto/user.input.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => UserType, { description: '通过 id 查询用户' })
    async find(@Args('id') id: string): Promise<UserType> {
        return this.userService.find(id);
    }

    @Mutation(() => Boolean, { description: '新增用户' })
    async create(@Args('params') params: UserInput): Promise<boolean> {
        return this.userService.create(params);
    }

    @Query(() => UserType, { description: '使用 ID 查询用户' })
    async getUserInfo(@Context() cxt: any): Promise<UserType> {
        const { id } = cxt.req.user;
        return this.userService.find(id);
    }

    @Mutation(() => Result, { description: '修改用户' })
    async updateUserInfo(
        @Args('id') id: string,
        @Args('params') params: UserInput,
    ): Promise<Result> {
        const res = await this.userService.update(id, params);
        if (res) {
            return { code: SUCCESS, message: '更新用户信息成功' };
        }

        return { code: UPDATE_ERROR, message: '更新用户信息失败' };
    }

    @Mutation(() => Boolean, { description: '删除一个用户' })
    async del(@Args('id') id: string): Promise<boolean> {
        return this.userService.del(id);
    }
}
