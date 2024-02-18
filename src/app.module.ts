import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brands/brand.module';
import { UserModule } from './modules/users/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '12345678',
            database: 'water-drop1',
            entities: [`${__dirname}/../modules/**/*.entity{.ts,.js}`],
            logging: false,
            synchronize: true,
            autoLoadEntities: true,
        }),
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            autoSchemaFile: true, // './schema.gql',
        }),
        UserModule,
        AuthModule,
        BrandModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
