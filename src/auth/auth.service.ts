import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    password,
    email,
  }: {
    password: string;
    email: string;
  }): Promise<User | null> {
    const res = await this.userService.findOne(email);
    if (res && res.password === password) {
      // remove password from output
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = res;
      return user;
    }
    return null;
  }
  async signToken(userId: string) {
    return this.jwtService.sign({ userId });
  }
}
