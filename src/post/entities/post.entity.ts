import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;
  @Field()
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  author?: User;
  @Field()
  authorId: string;
  @Field()
  videoUrl: string;
  @Field(() => Date)
  createdOn: Date;
}
