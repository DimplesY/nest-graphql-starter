import { Field, ObjectType } from '@nestjs/graphql'
import { Post } from './post.model'
import { BaseModel } from './base.model'

@ObjectType()
export class User extends BaseModel {
  @Field({ description: '用户名' })
  username: string

  @Field({ description: '密码' })
  password: string

  @Field(() => [Post])
  post: Post[]
}
