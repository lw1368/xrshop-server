import { ConsoleLogger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JWT_SECRET } from '@/common/constants/aliyun';

import { User } from '../users/models/user.entity';

import { UserService } from '../users/user.service';

import { AuthResolve } from './auth.resolve';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: JWT_SECRET,
            signOptions: {
                expiresIn: 60 * 60 * 24 * 7,
            },
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [JwtStrategy, ConsoleLogger, AuthService, AuthResolve, UserService],
    exports: [],
})
export class AuthModule {}
