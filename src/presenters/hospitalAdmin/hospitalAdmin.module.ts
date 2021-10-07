import { Module } from '@nestjs/common';
import { HospitalAdminService } from './hospitalAdmin.service';
import { HospitalAdminResolver } from './hospitalAdmin.resolver';
import { HospitalsModule } from './adminHospitals/hospitals.module';

@Module({
  imports: [HospitalsModule],
  providers: [HospitalAdminResolver, HospitalAdminService],
})
export class HospitalAdminModule {}
