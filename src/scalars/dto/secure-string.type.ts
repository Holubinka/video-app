import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SecureStringInput {
  @Field()
  raw: string;
  @Field()
  hash: string;
  @Field()
  encrypted: string;
}
