import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HelpersService } from 'src/helpers/helpers.service';
import { ErrorFormatService } from 'src/helpers/error-format/error-format.service';
import { MessageService } from 'src/helpers/message/message.service';
import { UserAuthDto } from './dto/auth.dto';
import { Request } from 'express';
import * as dotenv from 'dotenv';
dotenv.config(); 

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, HelpersService, ErrorFormatService, MessageService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [AuthService, HelpersService, ErrorFormatService, MessageService],
      }).compile();
  
      controller = module.get<AuthController>(AuthController);
      service = module.get<AuthService>(AuthService);
    });
  
    it('should return success response with valid username and password', async () => {
      const mockUserAuthDto: UserAuthDto = {
        username: 'itsbfcak',
        password: 'Password123!',
        token: 'godModeTesting@bang',
      };
  
      const mockInfo = { ip: '127.0.0.1', userAgent: 'Mozilla/5.0' };
      const mockReq: Partial<Request> = {
        response: {},
      };
  
      const response = await controller.auth(mockReq as Request, mockUserAuthDto, mockInfo);
      expect(response.responseCode).toBe('00');
      
    }, 1000 * 60);
  });
  

});
