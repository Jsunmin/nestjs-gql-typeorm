import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Users } from 'src/entities';

@ObjectType()
export class MobileUsers extends Users {}
