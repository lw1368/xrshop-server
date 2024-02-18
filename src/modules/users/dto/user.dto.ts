import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
    @Field()
    id?: string;

    @Field({ description: '昵称', nullable: true })
    name?: string;

    @Field({ description: '简介', nullable: true })
    email?: string;

    @Field({ description: 'phone', nullable: true })
    phone?: string;

    @Field({ description: '头像', nullable: true })
    avatar?: string;
}
