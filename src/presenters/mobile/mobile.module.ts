import { Module } from '@nestjs/common';
import { MobileService } from './mobile.service';
import { MobileResolver } from './mobile.resolver';
import { HospitalsModule } from './mobileHospitals/hospitals.module';

@Module({
  imports: [HospitalsModule],
  providers: [MobileResolver, MobileService],
})
export class MobileModule {}
