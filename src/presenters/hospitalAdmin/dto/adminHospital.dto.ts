import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { AdminHospitals } from '../entities/AdminHospital.entity';
import { HospitalTypesEnum } from 'src/entities/Hospitals';

@InputType()
export class CreateAdminHospitalInput extends AdminHospitals {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  addr: string;

  @Field({ nullable: false })
  phone: string;

  @Field(() => HospitalTypesEnum)
  hospitalType: HospitalTypesEnum;

  @Field({ nullable: false })
  longitude: number;

  @Field({ nullable: false })
  latitude: number;
}

@InputType()
export class UpdateAdminHospitalInput extends PartialType(
  CreateAdminHospitalInput,
) {
  @Field(() => Int)
  id: number;
}
