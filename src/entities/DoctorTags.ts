import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Doctors } from './Doctors';
import { DefaultTableForm } from './commonSchema';

@ObjectType({ isAbstract: true })
@InputType('DoctorTagInput', { isAbstract: true })
@Entity('doctorTags')
export class DoctorTags extends DefaultTableForm {
  @Field()
  @Column('varchar', { name: 'tag', length: 255 })
  tag: string;

  @Field(() => Doctors)
  @ManyToOne(() => Doctors, (doctors) => doctors.doctorTags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'doctorId', referencedColumnName: 'id' }])
  doctor: Doctors;
}
