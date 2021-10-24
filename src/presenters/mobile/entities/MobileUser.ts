import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Users } from 'src/entities';

@ObjectType()
export class MobileUsers extends Users {}

@ObjectType()
export class MobileUsersWithoutPassword extends OmitType(MobileUsers, [
  'password',
]) {}
