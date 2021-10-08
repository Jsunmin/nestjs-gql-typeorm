import { Entity, Column, RelationId, ManyToOne, JoinColumn } from 'typeorm';
import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';
import { DefaultTableForm } from './commonSchema';
import { Hospitals } from './Hospitals';

@Entity({ schema: 'sparrowT', name: 'doctors' })
@ObjectType({ isAbstract: true })
@InputType('DoctorInput', { isAbstract: true })
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

  @RelationId((doctor: Doctors) => doctor.hospital)
  hospitalId?: number;

  @Field(() => Hospitals, { nullable: true })
  @ManyToOne(() => Hospitals, (hospital) => hospital.doctors)
  @JoinColumn({ name: 'hospitalId', referencedColumnName: 'id' })
  hospital?: Hospitals;
}
