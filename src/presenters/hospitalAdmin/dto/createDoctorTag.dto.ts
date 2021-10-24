import { InputType, Int, Field } from '@nestjs/graphql';
import { AdminDoctorTags } from '../entities/AdminDoctorTag.entity';

@InputType({ isAbstract: true })
export class CreateDoctorTagInput extends AdminDoctorTags {
  @Field()
  tag: string;

  // doctor mutation 과 구분해서 만듦!
  // 맵핑할 의사아이디 기입
  @Field(() => Int)
  doctorId: number;
}
