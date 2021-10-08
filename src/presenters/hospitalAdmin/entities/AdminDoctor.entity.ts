import { ObjectType } from '@nestjs/graphql';
import { Doctors } from 'src/entities/Doctors';

// admin이기 떄문에 naive하게 엔티티 갖다 쓰자!
@ObjectType({ isAbstract: true })
export class AdminDoctors extends Doctors {}
