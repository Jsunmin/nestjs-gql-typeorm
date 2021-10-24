import { CreateDoctorInput } from './createDoctor.dto';
import { AdminDoctorTags } from '../entities/AdminDoctorTag.entity';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDoctorInput extends PartialType(CreateDoctorInput) {
  @Field(() => Int)
  id: number;

  @Field(() => [AdminDoctorTags], { nullable: 'itemsAndList' })
  doctorTags?: AdminDoctorTags[];
}
