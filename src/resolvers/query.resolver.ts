import { Resolver, Query, Context, Info } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Context as ContextType } from 'src/context';
import { GraphQLResolveInfo } from 'graphql';

@Resolver('AppQuery')
export class QueryResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'me' })
  async me(
    @CurrentUser()
    { userId }: { userId: string },
    @Context() ctx: ContextType,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.userService.findUnique(
      userId,
      new ctx.PrismaSelect(info).value,
    );
  }
}
