import { Test, TestingModule } from '@nestjs/testing';
import { MobileHospitalsResolver } from './mobileHospital.resolver';
import { MobileService } from './mobile.service';

describe('MobileHospitalsResolver', () => {
  let resolver: MobileHospitalsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MobileHospitalsResolver, MobileService],
    }).compile();

    resolver = module.get<MobileHospitalsResolver>(MobileHospitalsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
