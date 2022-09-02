import { Module } from '@nestjs/common';
import { MinioService } from 'src/minio/minio.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  providers: [PostService, PrismaService, MinioService, PostResolver],
  imports: [PrismaService],
})
export class PostModule {}
