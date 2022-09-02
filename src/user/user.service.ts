import { Injectable } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserInput } from './dto/register-user.input';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(emailHash: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { emailHash },
    });
  }

  async create(data: RegisterUserInput) {
    return this.prisma.user.create({
      data: {
        ...data,
        email: data.email.encrypted,
        emailHash: data.email.hash,
        password: data.password.hash,
      },
    });
  }

  async findUnique(id: string, select: any): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id },
      ...select,
    });
  }

  async me(@CurrentUser() { userId }: { userId: string }, select) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      ...select,
    });
  }
}
