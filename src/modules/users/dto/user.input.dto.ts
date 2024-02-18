import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
    @Field({ description: '昵称' })
    name?: string;

    @Field({ description: '邮箱' })
    email?: string;

    @Field({ description: '电话' })
    phone?: string;
}
