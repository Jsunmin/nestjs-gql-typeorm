import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { MobileHospitals } from '../entities/MobileHospitals';

@InputType()
export class UpdateMobileHospitalInput extends PartialType(MobileHospitals) {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  appHospitalField1?: string;
}
