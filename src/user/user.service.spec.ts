import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseService } from '../database/database.service';
import { PasswordService } from '../hash/hashpassword';

describe('UserService', () => {
  let service: UserService;
  


  const mockDatabaseService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    }
  };

  const mockPasswordService = {
    hashpassword: jest.fn(),
    comparePassword: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService, {
        provide: DatabaseService,
        useValue: mockDatabaseService,
      }, {
        provide: PasswordService,
        useValue: mockPasswordService,
      }],
    }).compile();

    service = module.get<UserService>(UserService);
  
  });

  it('should user by email', async () => {
     const testEmail = 'test123@mail.ru';
    const expectedUser = {
      id: '7',
      login: 'test123',
      email: 'test123@mail.ru'
    };
    mockDatabaseService.user.findUnique.mockResolvedValue(expectedUser);
    const result = await service.getUserByEmail(testEmail);
    expect(result).toEqual(expectedUser);

    expect(mockDatabaseService.user.findUnique).toHaveBeenCalledWith({
      where: { email: testEmail }
    });
  });
});
