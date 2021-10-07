import { CreateAdminHospitalInput } from './createAdminHospital.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAdminHospitalInput extends PartialType(
  CreateAdminHospitalInput,
) {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  searchable: boolean;

  @Field({ nullable: true })
  isDeleted: boolean;
}
