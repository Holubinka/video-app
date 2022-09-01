import { Module } from '@nestjs/common';
import { DateScalar } from './date.scalar';
import { SecureStringScalar } from './secure-string.scalar';

@Module({
  providers: [DateScalar, SecureStringScalar],
  exports: [DateScalar, SecureStringScalar],
})
export class ScalarsModule {}
