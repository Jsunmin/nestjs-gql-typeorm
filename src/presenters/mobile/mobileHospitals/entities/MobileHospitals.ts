import {
  Field,
  ObjectType,
  registerEnumType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Hospitals, HospitalTypesEnum } from 'src/entities/Hospitals';

registerEnumType(HospitalTypesEnum, {
  name: 'HospitalTypesEnum',
});

@ObjectType()
export class MobileHospitals extends PickType(Hospitals, [
  'id',
  'name',
  'addr',
  'safePhone',
  'longitude',
  'latitude',
]) {
  @Field({ nullable: true }) // 이슈3: 이걸 하드하게 박을 필요도 없겠지만, 만약에 하드하게 추가 필드를 가져가면, 공용 서비스 레이어에서 타입 때문에 깨짐..
  appHospitalField1?: string;

  @Field({ nullable: true })
  appHospitalField2?: string;
}
