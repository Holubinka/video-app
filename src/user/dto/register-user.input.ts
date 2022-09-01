import { InputType, Field } from '@nestjs/graphql';
import { SecureStringInput } from 'src/scalars/dto/secure-string.type';
import { SecureStringScalar } from 'src/scalars/secure-string.scalar';

@InputType()
export class RegisterUserInput {
  id?: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field(() => SecureStringScalar)
  email: SecureStringInput;
  @Field(() => SecureStringScalar)
  password: SecureStringInput;
}
