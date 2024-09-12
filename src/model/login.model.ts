import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Login {
  @Field({ description: '登录的 token' })
  accessToken: string
}
