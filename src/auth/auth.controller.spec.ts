import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { HelpersService } from 'src/helpers/helpers.service';
import { ErrorFormatService } from 'src/helpers/error-format/error-format.service';
import { MessageService } from 'src/helpers/message/message.service';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ AuthController],
      providers:[AuthService, HelpersService, ErrorFormatService, MessageService]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
