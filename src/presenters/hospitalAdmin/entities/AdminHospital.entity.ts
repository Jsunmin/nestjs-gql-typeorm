import { ObjectType, registerEnumType } from '@nestjs/graphql';
import { Hospitals, HospitalTypesEnum } from 'src/entities/Hospitals';

registerEnumType(HospitalTypesEnum, {
  name: 'HospitalTypesEnum',
});

// admin이기 떄문에 naive하게 엔티티 갖다 쓰자!
@ObjectType({ isAbstract: true })
export class AdminHospitals extends Hospitals {}
