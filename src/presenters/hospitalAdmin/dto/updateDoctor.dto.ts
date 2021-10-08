import { CreateDoctorInput } from './createDoctor.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDoctorInput extends PartialType(CreateDoctorInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  hospitalId: number;
}
