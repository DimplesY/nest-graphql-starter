import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BaseModel {
  @Field(() => Int, { description: '编号' })
  id: number

  @Field({ description: '创建时间', nullable: true })
  createdTime?: Date

  @Field({ description: '更新时间', nullable: true })
  updatedTime?: Date
}

@ObjectType()
export class LogicDeleteModel extends BaseModel {
  @Field({ description: '是否删除' })
  isDeleted: boolean
}
