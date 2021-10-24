import { ObjectType } from '@nestjs/graphql';
import { DoctorTags } from 'src/entities';

// admin이기 떄문에 naive하게 엔티티 갖다 쓰자!
@ObjectType({ isAbstract: true })
export class AdminDoctorTags extends DoctorTags {}
