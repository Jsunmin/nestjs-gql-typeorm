import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsResolver } from './AdminDoctor.resolver';
import { DoctorsService } from 'src/services/doctors.service';

describe('DoctorsResolver', () => {
  let resolver: DoctorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorsResolver, DoctorsService],
    }).compile();

    resolver = module.get<DoctorsResolver>(DoctorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
