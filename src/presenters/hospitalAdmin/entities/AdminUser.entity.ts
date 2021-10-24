import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { AdminUsers as SourceAdminUsers } from 'src/entities';

@ObjectType({ isAbstract: true })
export class AdminUsers extends SourceAdminUsers {}
