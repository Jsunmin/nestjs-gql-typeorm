import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospitals, Doctors } from 'src/entities';
import { UserModule } from 'src/modules/user.module';
import { HospitalsService } from 'src/services/hospitals.service';
import { MobileService } from './mobile.service';
import { MobileHospitalsResolver } from './mobileHospital.resolver';
import { MobileUsersResolver } from './mobileUser.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Hospitals, Doctors]), UserModule],
  providers: [
    MobileService,
    HospitalsService,
    MobileHospitalsResolver,
    MobileUsersResolver,
  ],
})
export class MobileModule {}
