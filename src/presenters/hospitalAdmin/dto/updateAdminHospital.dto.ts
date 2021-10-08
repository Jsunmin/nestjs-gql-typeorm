import { CreateAdminHospitalInput } from './createAdminHospital.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAdminHospitalInput extends PartialType(
  CreateAdminHospitalInput,
) {
  @Field(() => Int)
  id: number;
}
