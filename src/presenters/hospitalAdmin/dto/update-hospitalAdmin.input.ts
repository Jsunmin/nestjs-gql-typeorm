import { CreateHospitalAdminInput } from './create-hospitalAdmin.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHospitalAdminInput extends PartialType(
  CreateHospitalAdminInput,
) {
  @Field(() => Int)
  id: number;
}
