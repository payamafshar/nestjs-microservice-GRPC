import { Test, TestingModule } from '@nestjs/testing';
import { AuthGateWayController } from './auth-gate-way.controller';

describe('AuthGateWayController', () => {
  let controller: AuthGateWayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthGateWayController],
    }).compile();

    controller = module.get<AuthGateWayController>(AuthGateWayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
