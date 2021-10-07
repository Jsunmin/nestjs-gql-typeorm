import { CreateMobileInput } from './create-mobile.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMobileInput extends PartialType(CreateMobileInput) {
  @Field(() => Int)
  id: number;
}
