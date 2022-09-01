import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Auth } from 'src/user/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { RegisterUserInput } from 'src/user/dto/register-user.input';
import { UserService } from 'src/user/user.service';
import { MinioService } from 'src/minio/minio.service';
import { v4 as uuid } from 'uuid';
import { UseGuards } from '@nestjs/common';
import { GqlThrottlerGuard } from 'src/decorators/throttler-guard.decorator';
import { SecureStringInput } from 'src/scalars/dto/secure-string.type';

@UseGuards(GqlThrottlerGuard)
@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly minioService: MinioService,
  ) {}

  @Mutation(() => Auth, { name: 'login' })
  async login(
    @Args('email') email: SecureStringInput,
    @Args('password') password: SecureStringInput,
  ) {
    const user = await this.authService.validateUser({
      email: email.hash,
      password: password.hash,
    });
    return {
      token: this.authService.signToken(user.id),
      user,
    };
  }

  @Mutation(() => Auth, { name: 'register' })
  async register(@Args('data') data: RegisterUserInput) {
    const id = uuid();
    try {
      const profileDocsUrl = await this.minioService.makeBucket(id);
      const user = await this.userService.create({
        ...data,
        profileDocsUrl,
        id,
      });
      return {
        user,
        token: this.authService.signToken(user.id),
      };
    } catch (err) {
      throw err;
    }
  }
}
