import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { MinioService } from 'src/minio/minio.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import dataUtils from 'src/utils/dataUtils';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Status } from './entities/generic.entity';

@Resolver('AppMutation')
export class MutationResolver {
  constructor(
    private readonly userService: UserService,
    private readonly minioService: MinioService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Status)
  async uploadFile(
    @CurrentUser() { userId }: { userId: string },
    @Args({ name: 'file', type: () => GraphQLUpload })
    { filename, createReadStream }: FileUpload,
  ) {
    const buffer = await dataUtils.streamToBuffer(createReadStream());
    await this.minioService.putFile(filename, buffer, userId);
    return { status: 'OK' };
  }
}
