import { Injectable } from '@nestjs/common';
import { MinioService } from 'src/minio/minio.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationInput } from 'src/resolvers/entities/generic.entity';
import dataUtils from 'src/utils/dataUtils';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
  ) {}

  async create(post: CreatePostInput, userId: string): Promise<Post> {
    const video = await post.video;
    const buffer = await dataUtils.streamToBuffer(video.createReadStream());
    const name = `${video.filename} ${new Date().getTime()}`;
    let videoUrl;
    try {
      videoUrl = await this.minio.putFile(name, buffer, userId);
    } catch ({ message }) {
      throw new Error(message);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { video: _video, ...data } = post;
    return this.prisma.post.create({
      data: {
        ...data,
        videoUrl,
        author: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(pagination: PaginationInput, select?: any) {
    const posts = await this.prisma.post.findMany({
      ...pagination,
      ...select,
    });
    return posts.map((post) => ({
      ...post,
      videoUrl: new URL(`${process.env.MINIO_ADDRESS}${post.videoUrl}`),
    }));
  }
}
