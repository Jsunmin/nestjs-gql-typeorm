import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { DefaultTableForm } from './commonSchema';
import { IsEmail } from 'class-validator';

@ObjectType({ isAbstract: true })
@Entity('adminUsers')
export class AdminUsers extends DefaultTableForm {
  @Field()
  @IsEmail()
  @Column('varchar', { length: 50, unique: true })
  email: string;

  @Field()
  @Column('varchar', { length: 255, select: false })
  password: string;

  @Field()
  @Column('varchar', { length: 50 })
  name: string;

  // @Field()
  // @Column('varchar', { length: 50 })
  // name: string;
}
