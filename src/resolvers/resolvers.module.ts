import { Module } from '@nestjs/common';
import { MinioModule } from 'src/minio/minio.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { MutationResolver } from './mutation.resolver';
import { QueryResolver } from './query.resolver';

@Module({
  imports: [UserModule, PrismaModule, MinioModule],
  providers: [MutationResolver, QueryResolver],
})
export class ResolversModule {}
