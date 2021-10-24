import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { MobileUsers } from '../entities/MobileUser';

@InputType()
export class CreateMobileUserInput extends MobileUsers {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;
}

@InputType()
export class UpdateMobileUserInput extends MobileUsers {
  @Field(() => Int)
  id!: number;

  @Field()
  password: string;

  @Field()
  name: string;
}
