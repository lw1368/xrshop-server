import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { JwtService } from '@nestjs/jwt';

import dayjs from 'dayjs';

import {
    ACCOUNT_NOT_EXIST,
    CODE_NOT_EXIST,
    CODE_NOT_EXPIRE,
    LOGIN_ERROR,
    SUCCESS,
} from '@/common/constants/code';
import { Result } from '@/common/dto/result.type';

import { UserService } from '../users/user.service';

import { AuthService } from './auth.service';

@Resolver()
export class AuthResolve {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    @Mutation(() => Result, { description: '发送短信验证码' })
    async sendSmsMessage(@Args('phone') tel: string): Promise<Result> {
        return this.authService.sendCodeMsg(tel);
    }

    @Mutation(() => Result, { description: '登录' })
    async login(@Args('tel') tel: string, @Args('code') code: string): Promise<Result> {
        const user = await this.userService.findByTel(tel);

        if (!user) {
            return {
                code: ACCOUNT_NOT_EXIST,
                message: '账号不存在',
            };
        }
        if (!user.codeCreateTimeAt || !user.code) {
            return {
                code: CODE_NOT_EXIST,
                message: '验证码不存在',
            };
        }
        if (dayjs().diff(dayjs(user.codeCreateTimeAt)) > 60 * 60 * 1000) {
            return {
                code: CODE_NOT_EXPIRE,
                message: '验证码过期',
            };
        }

        if (user.code === code) {
            const jwtToken = this.jwtService.sign({ id: user.id });
            return {
                code: SUCCESS,
                message: '登录成功',
                data: jwtToken,
            };
        }

        return { code: LOGIN_ERROR, message: '登录失败，手机号或者验证码不对' };
    }
}
