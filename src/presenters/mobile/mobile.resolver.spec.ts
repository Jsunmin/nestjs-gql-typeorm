import { Test, TestingModule } from '@nestjs/testing';
import { MobileResolver } from './mobile.resolver';
import { MobileService } from './mobile.service';

describe('MobileResolver', () => {
  let resolver: MobileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MobileResolver, MobileService],
    }).compile();

    resolver = module.get<MobileResolver>(MobileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
