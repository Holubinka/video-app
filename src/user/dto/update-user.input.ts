import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { RegisterUserInput } from './register-user.input';

@InputType()
export class UpdateUser extends PartialType(OmitType(RegisterUserInput, [])) {}
