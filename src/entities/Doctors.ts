import {
  Entity,
  Column,
  RelationId,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';
import { DefaultTableForm } from './commonSchema';
import { Hospitals } from './Hospitals';
import { DoctorTags } from './DoctorTags';

@ObjectType({ isAbstract: true })
@InputType('DoctorInput', { isAbstract: true })
@Entity('doctors')
export class Doctors extends DefaultTableForm {
  @Field()
  @Column({ length: 10 })
  name: string;

  @Field()
  @Column({ length: 10 })
  position: string;

  @Field(() => Int, { nullable: true })
  @Column('tinyint', { nullable: true })
  gender: number;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  image: string;

  @Field({ nullable: true })
  @Column({ default: true, nullable: true })
  searchable: boolean;

  @Field(() => Hospitals)
  @ManyToOne(() => Hospitals, (hospital) => hospital.doctors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }) // arg0: 현재 테이블 기준, arg1: 맵핑되는 테이블 기준
  @JoinColumn({ name: 'hospitalId', referencedColumnName: 'id' })
  hospital: Hospitals;

  @Field(() => [DoctorTags], { nullable: 'itemsAndList' })
  @OneToMany(() => DoctorTags, (doctorTags) => doctorTags.doctor)
  doctorTags?: DoctorTags[];
}
