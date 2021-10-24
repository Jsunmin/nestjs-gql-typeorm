import { Entity, Column, OneToMany } from 'typeorm';
import {
  Field,
  ObjectType,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import { DefaultTableForm } from './commonSchema';
import { Doctors } from './Doctors';

export enum HospitalTypesEnum {
  'hospital' = 1,
  'pharmacy' = 2,
  'generalHospital' = 3,
}
registerEnumType(HospitalTypesEnum, {
  name: 'HospitalTypesEnum',
});
// code-first: SDL과 DDL 일원화 & code type -> schema 로 (type-graphql 지향)

@ObjectType({ isAbstract: true })
@InputType('HospitalInput', { isAbstract: true })
@Entity('hospitals')
export class Hospitals extends DefaultTableForm {
  @Field()
  @Column({ length: 250 })
  name: string;

  @Field()
  @Column({ length: 300 })
  addr: string;

  @Field()
  @Column({ length: 20 })
  phone: string;

  @Field({ nullable: true })
  @Column({ length: 20, nullable: true })
  safePhone: string;

  @Field(() => HospitalTypesEnum)
  @Column({ type: 'enum', enum: HospitalTypesEnum })
  hospitalType: HospitalTypesEnum;

  @Field({ nullable: false })
  @Column('float')
  longitude: number;

  @Field({ nullable: false })
  @Column('float')
  latitude: number;

  @Field({ nullable: true })
  @Column({ default: true })
  searchable: boolean;

  @Field({ nullable: true })
  @Column({ default: false })
  isDeleted: boolean;

  @Field(() => [Doctors], { nullable: 'itemsAndList' })
  @OneToMany(() => Doctors, (doctor) => doctor.hospital)
  doctors: Doctors[];

  getMaskedPhone(): string {
    const maskedFields = this.phone.slice(5).replace(/[0-9]/g, '*');
    return `${this.phone.slice(0, 5)}${maskedFields}`;
  }

  setSafePhone(): string {
    if (this.phone) {
      return this.phone.replace(/-/g, '*');
    }
  }
}
