import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UserResolver, PrismaService, UserService],
  exports: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}
