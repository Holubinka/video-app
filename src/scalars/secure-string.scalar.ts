import { Scalar, CustomScalar } from '@nestjs/graphql';
import { GraphQLScalarLiteralParser } from 'graphql';
import { SecureStringInput } from './dto/secure-string.type';
import dataUtils from 'src/utils/dataUtils';

@Scalar('SecureString')
export class SecureStringScalar
  implements CustomScalar<string, SecureStringInput>
{
  hash: string;
  raw: string;
  encrypted: string;
  parseLiteral: GraphQLScalarLiteralParser<SecureStringInput>;
  description = 'Secure String scalar';
  parseValue(raw: string): SecureStringInput {
    if (typeof raw !== 'string') {
      throw new Error(`should be string`);
    }
    return {
      raw,
      hash: dataUtils.hashString(raw),
      encrypted: dataUtils.encryptString(raw),
    };
  }
  serialize(value: string): string {
    return dataUtils.decryptString(value);
  }
}
