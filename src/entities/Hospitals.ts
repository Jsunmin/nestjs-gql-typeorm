import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
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

@Entity({ schema: 'sparrowT', name: 'hospitals' })
@ObjectType({ isAbstract: true })
@InputType('HospitalInput', { isAbstract: true })
export class Hospitals extends DefaultTableForm {
  constructor(hospital?: Partial<Hospitals>) {
    super();
    if (hospital) {
      this.name = hospital.name;
      this.addr = hospital.addr;
      this.phone = hospital.phone;
      this.safePhone = this.setSafePhone();
      this.hospitalType = hospital.hospitalType;
    }
  }

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
