import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MinioModule } from 'src/minio/minio.module';
import { MinioService } from 'src/minio/minio.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [
    AuthService,
    JwtStrategy,
    AuthResolver,
    UserService,
    PrismaService,
    MinioService,
  ],
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '3600' },
    }),
    UserModule,
    PrismaModule,
    MinioModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
