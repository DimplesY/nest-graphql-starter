import { IS_PUBLIC_KEY } from '@/decorator/public.decorator'
import { UserService } from '@/service/user.service'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    const gqlContext = GqlExecutionContext.create(context)
    const request = gqlContext.getContext().req

    const headers = request.headers
    const authorization: string = headers.authorization || headers.Authorization

    if (!authorization) {
      throw new UnauthorizedException('未登录')
    }
    const token = authorization.replace(/[Bb]earer /, '')

    try {
      const payload = await this.jwtService.verifyAsync(token)
      const user = await this.userService.findUserById(payload.sub)
      if (!user) {
        throw new UnauthorizedException('用户不存在')
      }

      gqlContext.getContext().user = user
    } catch {
      throw new UnauthorizedException('身份过期')
    }
    return true
  }
}
