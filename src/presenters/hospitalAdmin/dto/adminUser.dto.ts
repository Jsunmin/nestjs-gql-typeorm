import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { AdminUsers } from '../entities/AdminUser.entity';

@InputType()
export class CreateAdminUserInput extends AdminUsers {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;
}

@InputType()
export class UpdateAdminUserInput extends AdminUsers {
  @Field(() => Int)
  id!: number;

  @Field()
  password: string;

  @Field()
  name: string;
}
