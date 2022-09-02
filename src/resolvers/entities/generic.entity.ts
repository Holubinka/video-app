import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Status {
  @Field()
  status: string;
}

@InputType()
export class GenericIdInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class WhereUniqueInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class PaginationInput {
  @Field(() => Int)
  take: number;
  @Field(() => Int)
  skip: number;
}
