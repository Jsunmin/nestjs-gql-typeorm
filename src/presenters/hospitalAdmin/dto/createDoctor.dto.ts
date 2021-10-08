import { InputType, Int, Field } from '@nestjs/graphql';
import { AdminDoctors } from '../entities/AdminDoctor.entity';

@InputType()
export class CreateDoctorInput extends AdminDoctors {
  @Field()
  name: string;

  @Field()
  position: string;

  @Field(() => Int)
  gender: number;

  @Field({ nullable: true })
  image: string;

  @Field(() => Int, { nullable: true })
  hospitalId: number;
}
