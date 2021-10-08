import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospitals } from 'src/entities/Hospitals';
import { HospitalsService } from 'src/services/hospitals.service';
import { MobileService } from './mobile.service';
import { MobileHospitalsResolver } from './mobileHospital.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Hospitals])],
  providers: [MobileService, HospitalsService, MobileHospitalsResolver],
})
export class MobileModule {}
