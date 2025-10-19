import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

const mockAuthGuard = {
  canActivate: jest.fn(() => true)
};

describe('UserController', () => {
  let controller: UserController;
  let userService: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue({
              id: '7',
              login: 'test1',
              email: 'test1@mail.ru',
            }),
            getUserByEmail: jest.fn().mockResolvedValue({
              id: '1',
              login: 'test2',
              email: 'test2@mail.ru',
            })
          }
        },
        {
          provide: 'DatabaseService',
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            }
          }
        },
        {
          provide: 'PasswordService',
          useValue: {
            useValue: {
              hashPassword: jest.fn().mockResolvedValue('hashed_password'),
              comparePassword: jest.fn().mockResolvedValue(true)
            }
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn()
          }
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn()
          }
        }
      ]
    }).overrideGuard(AuthGuard)
    .useValue(mockAuthGuard)
    .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get(UserService);
  });

  it('should return user',  async () => {
    const createUserDto = {
      login: 'test1',
      email: 'test1@mail.ru',
      password: '1234567'
    }
    expect(await controller.createUser(createUserDto)).toEqual({
      id: '7',
      login: 'test1',
      email: 'test1@mail.ru',
    });
  });
});
