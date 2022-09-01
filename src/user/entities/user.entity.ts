import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  emailHash: string;
  @Field({ nullable: true })
  password?: string;
  @Field()
  active: boolean;
  @Field(() => Date)
  registeredOn: Date;
}

@ObjectType()
export class Auth {
  @Field()
  user: User;
  @Field()
  token: string;
}
