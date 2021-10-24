import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { DefaultTableForm } from './commonSchema';

@ObjectType({ isAbstract: true })
@Entity('roles')
export class Roles extends DefaultTableForm {
  @Field()
  @Column('varchar', { length: 50 })
  name: string;

  @Field()
  @Column('varchar', { length: 255 })
  description: string;
}
