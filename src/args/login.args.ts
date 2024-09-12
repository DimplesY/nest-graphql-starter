import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export default class LoginInput {
  @Field({ description: '用户名' })
  username: string

  @Field({ description: '密码' })
  password: string
}
