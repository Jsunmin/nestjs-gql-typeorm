import { Test, TestingModule } from '@nestjs/testing';
import { HospitalAdminResolver } from './hospitalAdmin.resolver';
import { HospitalAdminService } from './hospitalAdmin.service';

describe('HospitalAdminResolver', () => {
  let resolver: HospitalAdminResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HospitalAdminResolver, HospitalAdminService],
    }).compile();

    resolver = module.get<HospitalAdminResolver>(HospitalAdminResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
