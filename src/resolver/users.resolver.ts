import { UserService } from './../service/user.service'
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Post } from '@/model/post.model'
import { User } from '@/model/user.model'
import UserInput from '@/input/user.input'
import { Public } from '@/decorator/public.decorator'
import { Login } from '@/model/login.model'
import LoginArgs from '@/args/login.args'
import { PaginationArgs } from '@/args/page.args'

@Resolver(() => User)
export class UserReslover {
  constructor(private userService: UserService) {}

  @Query(() => User, { name: 'userInfo' })
  getUserInfo(@Context() context: { user: User }) {
    return context.user
  }

  @Public()
  @Query(() => Login, { name: 'login' })
  userLogin(@Args() loginArgs: LoginArgs) {
    return this.userService.signIn(loginArgs.username, loginArgs.password)
  }

  @Query(() => User, { name: 'user' })
  getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findUserById(id)
  }

  @Query(() => [User], { name: 'userList' })
  getUserList(@Args() paginationArgs: PaginationArgs) {
    const { skip, take } = paginationArgs
    return this.userService.findUserList(skip, take)
  }

  @ResolveField('post', () => [Post])
  async getPostList(@Parent() user: User) {
    return this.userService.findPostByUserId(user.id)
  }

  @Mutation(() => User)
  createUser(@Args('user') userInput: UserInput) {
    return this.userService.createUser(userInput)
  }
}
