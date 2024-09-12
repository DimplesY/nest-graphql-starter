import { Field, Int, ObjectType } from '@nestjs/graphql'
import { LogicDeleteModel } from './base.model'
import { User } from './user.model'

@ObjectType()
export class Post extends LogicDeleteModel {
  @Field({ description: '文章标题' })
  title: string

  @Field({ description: '文章内容' })
  content: string

  @Field(() => Int, { description: '文章作者编号' })
  userId: number

  @Field(() => User, { description: '文章作者' })
  user: User
}
