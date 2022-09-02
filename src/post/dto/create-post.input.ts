import { InputType, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;
  @Field({ nullable: true })
  description?: string;
  @Field(() => GraphQLUpload)
  video: Promise<FileUpload>;
}
