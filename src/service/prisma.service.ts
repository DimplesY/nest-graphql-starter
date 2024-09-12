import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export default class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super()
  }

  onModuleInit() {
    this.$connect().then(() => {
      console.log('连接数据库成功')
    })
  }
  onModuleDestroy() {
    this.$disconnect().then(() => {
      console.log('数据库已关闭')
    })
  }
}
