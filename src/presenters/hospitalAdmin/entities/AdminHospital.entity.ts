import {
  ObjectType,
  InputType,
  Field,
  registerEnumType,
} from '@nestjs/graphql';
import { IsPhoneNumber, IsPositive } from 'class-validator';
import { Hospitals, HospitalTypesEnum } from 'src/entities';

registerEnumType(HospitalTypesEnum, {
  name: 'HospitalTypesEnum',
});

// admin이기 떄문에 naive하게 엔티티 갖다 쓰자!
@ObjectType({ isAbstract: true })
export class AdminHospitals extends Hospitals {
  @Field()
  @IsPhoneNumber('KR') // class-validator를 통한 DTO레벨 유효성 체크
  phone: string;

  @Field({ nullable: false })
  @IsPositive()
  longitude: number;

  @Field({ nullable: false })
  @IsPositive()
  latitude: number;
}
