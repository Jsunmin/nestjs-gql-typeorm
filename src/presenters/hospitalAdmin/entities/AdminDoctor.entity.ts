import { ObjectType, Field } from '@nestjs/graphql';
import { Doctors } from 'src/entities';
import { AdminDoctorTags } from '../entities/AdminDoctorTag.entity';
import { AdminHospitals } from '../entities/AdminHospital.entity';

// admin이기 떄문에 naive하게 엔티티 갖다 쓰자!
@ObjectType({ isAbstract: true })
export class AdminDoctors extends Doctors {
  @Field(() => [AdminDoctorTags], { nullable: 'itemsAndList' })
  doctorTags?: AdminDoctorTags[];

  @Field(() => AdminHospitals)
  hospital: AdminHospitals;
}
