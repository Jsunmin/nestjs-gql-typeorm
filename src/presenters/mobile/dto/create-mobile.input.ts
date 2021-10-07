import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMobileInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
