import { ObjectType } from '@nestjs/graphql';

import { createResult } from '@/common/dto/result.type';

import { UserType } from './user.dto';

@ObjectType()
export class UserResult extends createResult(UserType) {}
