import { Test, TestingModule } from '@nestjs/testing';
import { HospitalAdminService } from './hospitalAdmin.service';

describe('HospitalAdminService', () => {
  let service: HospitalAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HospitalAdminService],
    }).compile();

    service = module.get<HospitalAdminService>(HospitalAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
