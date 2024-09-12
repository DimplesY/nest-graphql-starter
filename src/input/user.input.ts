import { Field, InputType } from '@nestjs/graphql'

@InputType()
export default class UserInput {
  @Field({ nullable: false })
  username: string

  @Field({ nullable: false })
  password: string
}
