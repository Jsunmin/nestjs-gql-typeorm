import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospitals, Doctors } from 'src/entities';
import { HospitalAdminService } from './hospitalAdmin.service';
import { HospitalsService } from 'src/services/hospitals.service';
import { DoctorsService } from 'src/services/doctors.service';
import { HospitalsResolver } from './AdminHospital.resolver';
import { DoctorsResolver } from './AdminDoctor.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Hospitals, Doctors])],
  providers: [
    HospitalAdminService,
    HospitalsService,
    HospitalsResolver,
    DoctorsService,
    DoctorsResolver,
  ],
})
export class HospitalAdminModule {}
