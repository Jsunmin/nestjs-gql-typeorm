import { InputType, Int, Field } from '@nestjs/graphql';
import { AdminDoctors } from '../entities/AdminDoctor.entity';
import { AdminDoctorTags } from '../entities/AdminDoctorTag.entity';
import { UpdateAdminHospitalInput } from './updateAdminHospital.dto';

@InputType({ isAbstract: true })
export class CreateDoctorInput extends AdminDoctors {
  @Field()
  name: string;

  @Field()
  position: string;

  @Field(() => Int)
  gender: number;

  @Field({ nullable: true })
  image: string;

  // 이를 설정하기 위해 inputType add!
  @Field(() => [AdminDoctorTags], { nullable: 'itemsAndList' })
  doctorTags?: AdminDoctorTags[];

  @Field(() => Int, { nullable: true })
  hospitalId: number;

  @Field(() => UpdateAdminHospitalInput)
  adminHospital: UpdateAdminHospitalInput;
}
