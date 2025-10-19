import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '../src/pipes/validation.pipe';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect('Hello World!');
  });

   it('/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'test123@mail.ru',
        login: 'test123',
        password: '12345'
      })
      .expect(201)
      .expect({
        email: 'test123@mail.ru',
        login: 'test123',
        password: '12345'
      });
  });

  afterAll(async() => {
    await app.close();
  })
});
