import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospitals, Doctors } from 'src/entities';
import { AdminUserModule } from 'src/modules/adminUser.module';
import { HospitalAdminService } from './hospitalAdmin.service';
import { HospitalsService } from 'src/services/hospitals.service';
import { DoctorsService } from 'src/services/doctors.service';
import { HospitalsResolver } from './adminHospital.resolver';
import { DoctorsResolver } from './adminDoctor.resolver';
import { AdminUsersResolver } from './adminUser.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Hospitals, Doctors]), AdminUserModule],
  providers: [
    HospitalAdminService,
    HospitalsService,
    HospitalsResolver,
    DoctorsService,
    DoctorsResolver,
    AdminUsersResolver,
  ],
})
export class HospitalAdminModule {}
