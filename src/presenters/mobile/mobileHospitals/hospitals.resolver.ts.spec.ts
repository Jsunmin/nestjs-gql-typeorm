import { Test, TestingModule } from '@nestjs/testing';
import { HospitalsResolver } from './hospitals.resolver';

describe('HospitalsResolver', () => {
  let provider: HospitalsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HospitalsResolver],
    }).compile();

    provider = module.get<HospitalsResolver>(HospitalsResolver);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
