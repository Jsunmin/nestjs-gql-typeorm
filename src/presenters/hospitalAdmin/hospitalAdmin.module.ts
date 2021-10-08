import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospitals } from 'src/entities/Hospitals';
import { HospitalAdminService } from './hospitalAdmin.service';
import { HospitalsService } from 'src/services/hospitals.service';
import { HospitalsResolver } from './AdminHospital.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Hospitals])],
  providers: [HospitalAdminService, HospitalsService, HospitalsResolver],
})
export class HospitalAdminModule {}
