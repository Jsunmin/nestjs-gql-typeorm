import { ObjectType, OmitType } from '@nestjs/graphql';
import { AdminUsers as SourceAdminUsers } from 'src/entities';

@ObjectType({ isAbstract: true })
export class AdminUsers extends SourceAdminUsers {}

@ObjectType({ isAbstract: true })
export class AdminUsersWithoutPassword extends OmitType(AdminUsers, [
  'password',
]) {}
