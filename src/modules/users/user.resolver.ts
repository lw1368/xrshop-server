import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SUCCESS, UPDATE_ERROR } from '@/common/constants/code';
import { PageInput } from '@/common/dto/page.input';
import { Result } from '@/common/dto/result.type';

import { UserType } from './dto/user.dto';
import { UserInput } from './dto/user.input.dto';
import { UserResults } from './dto/user.result.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => UserType, { description: '通过 id 查询用户' })
    async find(@Args('id') id: string): Promise<UserType> {
        return this.userService.find(id);
    }

    @Query(() => UserResults, { description: '获取用户列表' })
    async getUserlist(
        @Args('name', { nullable: true }) name?: string,
        @Args('phone', { nullable: true }) phone?: string,
        @Args('page') page?: PageInput,
    ): Promise<UserResults> {
        console.log(page);
        const { pageNum, pageSize } = page;
        const [results, total] = await this.userService.findUsers({
            start: pageNum === 1 ? 0 : (pageNum - 1) * pageSize,
            length: pageSize,
        });
        console.log(results);
        return {
            code: SUCCESS,
            data: results,
            page: {
                pageNum,
                pageSize,
                total,
            },
            message: '获取成功',
        };
    }

    @Mutation(() => Result, { description: '新增用户' })
    async create(@Args('params') params: UserInput): Promise<Result> {
        const res = this.userService.create(params);
        if (res) {
            return { code: SUCCESS, message: '添加用户信息成功' };
        }

        return { code: UPDATE_ERROR, message: '添加用户信息失败' };
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

    @Mutation(() => Result, { description: '删除用户' })
    async del(@Args('ids') ids: string): Promise<Result> {
        const res = this.userService.del(JSON.parse(ids));
        if (res) {
            return { code: SUCCESS, message: '删除用户信息成功' };
        }

        return { code: UPDATE_ERROR, message: '删除用户信息失败' };
    }
}
