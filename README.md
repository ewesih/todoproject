## ToDo Project

## 🛠️ Tech Stack

- **Backend:** NestJS, TypeScript, Node.js
- **Database:** MongoDB
- **ORM:** Prisma
- **Authentication:** JWT
- **Validation:** class-validator
- **Testing:** Jest, nest/testing
- **E2E Testing:** Supertest
- **Password Hashing:** bcrypt


## 📦 Installation & Setup

```
# Clone repository
$ git clone https://github.com/ewesih/todoproject.git

# Install dependencies
$ npm install

# Run database migrations
$ npm run migration:run

# Start development server
$ npm run start:dev
```

## 💿 Database Structure

-- Основные таблицы: User, List


## 🎯 API Endpoints

| Method | Endpoint | Description |
|-------|----------|---------|
| POST    | /user/register    | Регистрация пользователя    |
| DELETE  | /user/delete      | Удаление пользователя    |
| PATCH    | /user/profile  | Редактирование пользователя    |
| GET  | /user/:email | Поиск пользователя по email   |
| PATCH    | /user/profile  | Редактирование пользователя    |
| POST    | /auth/login | Аутентификация пользователя    |
| GET    | /auth/profile| Получение пользователя   |
| GET    | /list| Получение todo задачи   |
| POST   | /list/create | Созданеи todo задачи   |
| DELETE   | /list/delete | Удаление задачи |
| PATCH    | /list/patch | Изменение задачи   |

👤 Author
Eleonora

GitHub: @ewesih