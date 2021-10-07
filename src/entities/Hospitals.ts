import { Entity, Column } from 'typeorm';
import { DefaultTableForm } from './commonSchema';

export enum HospitalTypesEnum {
  'hospital' = 1,
  'pharmacy' = 2,
  'generalHospital' = 3,
}
// registerEnumType(HospitalTypesEnum, {
//   name: 'HospitalTypesEnum',
// });
// code-first: SDL과 DDL 일원화 & code type -> schema 로 (type-graphql 지향)

@Entity({ schema: 'sparrowT', name: 'hospitals' })
export class Hospitals extends DefaultTableForm {
  @Column({ length: 250 })
  name: string;

  @Column({ length: 300 })
  addr: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 20 })
  safePhone: string;

  @Column({ type: 'enum', enum: HospitalTypesEnum })
  hospitalType: HospitalTypesEnum;

  @Column('float')
  longitude: number;

  @Column('float')
  latitude: number;

  @Column({ default: true })
  searchable: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  getMaskedPhone(): string {
    const maskedFields = this.phone.slice(5).replace(/[0-9]/g, '*');
    return `${this.phone.slice(0, 5)}${maskedFields}`;
  }
}
