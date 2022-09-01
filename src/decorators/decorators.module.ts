import { Module } from '@nestjs/common';
import { CurrentUser } from './current-user.decorator';
import { GqlThrottlerGuard } from './throttler-guard.decorator';

@Module({
  exports: [CurrentUser, GqlThrottlerGuard],
})
export class AuthModule {}
