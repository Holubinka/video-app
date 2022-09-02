import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SecureStringScalar } from 'src/scalars/secure-string.scalar';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;
  @Field(() => SecureStringScalar)
  email: string;
  @Field()
  emailHash: string;
  @Field(() => SecureStringScalar, { nullable: true })
  password?: string;
  @Field()
  active: boolean;
  @Field(() => Date)
  registeredOn: Date;
  @Field()
  username: string;
}

@ObjectType()
export class Auth {
  @Field()
  user: User;
  @Field()
  token: string;
}
