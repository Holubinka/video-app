import { Field } from '@nestjs/graphql';

export class SecureStringInput {
  @Field()
  raw: string;
  @Field()
  hash: string;
  @Field()
  encrypted: string;
}
