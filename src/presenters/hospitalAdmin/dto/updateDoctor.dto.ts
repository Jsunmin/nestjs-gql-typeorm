import { CreateDoctorInput } from './createDoctor.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDoctorInput extends CreateDoctorInput {
  @Field(() => Int)
  id: number;
}
