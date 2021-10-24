import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/common/auth/auth.module';
import { AdminUsers } from 'src/entities';
import { AdminUsersService } from 'src/services/adminUsers.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUsers]), AuthModule],
  providers: [AdminUsersService],
  exports: [AdminUsersService],
})
export class AdminUserModule {}
