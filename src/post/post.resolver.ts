import {
  Resolver,
  Mutation,
  Args,
  Query,
  Info,
  Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlThrottlerGuard } from 'src/decorators/throttler-guard.decorator';
import { PostService } from './post.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entities/post.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationInput } from 'src/resolvers/entities/generic.entity';
import { GraphQLResolveInfo } from 'graphql';
import { Context as ContextType } from 'src/context';

@UseGuards(GqlThrottlerGuard)
@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post, { name: 'createPost' })
  async create(
    @CurrentUser() { userId }: { userId: string },
    @Args({ name: 'post', type: () => CreatePostInput })
    post: CreatePostInput,
  ) {
    return this.postService.create(post, userId);
  }

  @Query(() => [Post], { name: 'posts' })
  async posts(
    @Args({ name: 'pagination', type: () => PaginationInput })
    pagination: PaginationInput,
    @Context() ctx: ContextType,
    @Info() info: GraphQLResolveInfo,
  ) {
    const select = new ctx.PrismaSelect(info).value;
    return this.postService.findAll(pagination, select);
  }
}
