import { Module } from '@nestjs/common';
import { HospitalsService } from 'src/services/hospitals.service';
import { HospitalsResolver } from './hospitals.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospitals } from 'src/entities/Hospitals';

@Module({
  imports: [TypeOrmModule.forFeature([Hospitals])],
  providers: [HospitalsService, HospitalsResolver],
})
export class HospitalsModule {}
