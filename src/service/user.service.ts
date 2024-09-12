import { Injectable, UnauthorizedException } from '@nestjs/common'
import PrismaService from './prisma.service'
import { Prisma } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { Login } from '@/model/login.model'

@Injectable()
export class UserService {
  constructor(
    private db: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<Login> {
    const user = await this.db.user.findFirst({
      where: { username, password },
    })

    if (user?.password !== password) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, username: user.username }

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  findUserById(id: number) {
    return this.db.user.findUnique({ where: { id } })
  }

  findUserList(skip: number, take: number) {
    return this.db.user.findMany({ take, skip })
  }

  findPostByUserId(id: number) {
    return this.db.user.findUnique({ where: { id } }).Post()
  }

  createUser(user: Prisma.UserCreateInput) {
    return this.db.user.create({
      data: user,
      select: { id: true, username: true, password: true },
    })
  }
}
