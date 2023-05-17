import { Test, TestingModule } from '@nestjs/testing';
import { AuthGateWayService } from './auth-gate-way.service';

describe('AuthGateWayService', () => {
  let service: AuthGateWayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGateWayService],
    }).compile();

    service = module.get<AuthGateWayService>(AuthGateWayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
