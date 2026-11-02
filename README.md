<<<<<<< HEAD
# Student Management System

A REST API built with TypeScript, Node.js, Express and MongoDB. It demonstrates layered architecture, OOP, SOLID-oriented dependency separation, type-safe DTOs and manual dependency injection.

## Setup

1. Install Node.js and MongoDB.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `MONGODB_URI` and a strong `JWT_SECRET`.
4. Run `npm run dev`.
5. Check `GET http://localhost:3000/`.

## Scripts

- `npm run dev` — development server
- `npm run typecheck` — TypeScript check
- `npm run build` — compile to `dist`
- `npm start` — run compiled server

## API

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register student account |
| POST | `/api/auth/login` | Public | Login |
| GET | `/api/courses` | Public | List courses |
| GET | `/api/courses/:id` | Public | Get course |
| POST | `/api/courses` | Admin | Create course |
| PATCH | `/api/courses/:id` | Admin | Update course |
| DELETE | `/api/courses/:id` | Admin | Delete course |
| GET | `/api/students` | Admin | List student profiles |
| GET | `/api/students/:id` | Admin | Get student |
| POST | `/api/students` | Admin | Create student profile |
| PATCH | `/api/students/:id` | Admin | Update student |
| DELETE | `/api/students/:id` | Admin | Delete student |

Send protected requests with `Authorization: Bearer <token>`. Public registration creates student accounts. Create an admin account by changing the role in the database for the first admin, then use that account to manage records.

### Example registration body
```json
{ "name": "Hafiz", "email": "hafiz@example.com", "password": "StrongPass123" }
```

### Example course body
```json
{ "code": "CS101", "title": "Programming Fundamentals", "description": "Introduction to programming", "credits": 4 }
```

## Architecture

- `models`: OOP domain classes and Mongoose schemas
- `interfaces`: contracts and request/response types
- `repositories`: database access
- `services`: business rules
- `controllers`: HTTP request/response handling
- `routes`: endpoint definitions
- `middlewares`: authentication, authorization and errors
- `config`: database connection
- `utils`: shared helpers

## OOP and SOLID

- `User` is an abstract base class; `Student` and `Admin` inherit from it.
- `getDashboardMessage()` is overridden, demonstrating polymorphism.
- `User` keeps its role private and exposes it through a getter (encapsulation).
- Controllers depend on services; services depend on repositories, keeping responsibilities separated.
- Interfaces and DTO types define clear contracts. `Pick`, `Omit`, `Partial` and `Readonly` are used for request/update/response types.
- Dependencies are constructed and injected in `app.ts` (manual DI).

## Suggested Git workflow

Create `develop` from `main`, then work on feature branches and merge completed features into `develop`. Suggested commit sequence (one file per commit):

| File | Commit message |
|---|---|
| `package.json` | `chore: configure project dependencies and scripts` |
| `tsconfig.json` | `chore: configure TypeScript compiler` |
| `.env.example` | `chore: add environment variable template` |
| `.gitignore` | `chore: ignore generated and secret files` |
| `interfaces/IUser.ts` | `feat: define user and authentication contracts` |
| `interfaces/IStudent.ts` | `feat: define student data contracts` |
| `interfaces/ICourse.ts` | `feat: define course data contracts` |
| `interfaces/IRepository.ts` | `feat: define generic repository contract` |
| `models/User.ts` | `feat: add abstract user domain class` |
| `models/Student.ts` | `feat: add student class extending user` |
| `models/Admin.ts` | `feat: add admin class extending user` |
| `models/UserModel.ts` | `feat: add user database schema` |
| `models/StudentModel.ts` | `feat: add student database schema` |
| `models/CourseModel.ts` | `feat: add course database schema` |
| `repositories/StudentRepository.ts` | `feat: implement student repository` |
| `repositories/CourseRepository.ts` | `feat: implement course repository` |
| `utils/AppError.ts` | `feat: add application error utility` |
| `utils/asyncHandler.ts` | `feat: add async route handler utility` |
| `utils/generateToken.ts` | `feat: add JWT generation utility` |
| `middlewares/authMiddleware.ts` | `feat: add JWT authentication and role authorization` |
| `middlewares/errorMiddleware.ts` | `feat: add centralized error middleware` |
| `services/AuthService.ts` | `feat: implement authentication service` |
| `services/StudentService.ts` | `feat: implement student business logic` |
| `services/CourseService.ts` | `feat: implement course business logic` |
| `controllers/AuthController.ts` | `feat: add authentication controller` |
| `controllers/StudentController.ts` | `feat: add student controller` |
| `controllers/CourseController.ts` | `feat: add course controller` |
| `routes/authRoutes.ts` | `feat: add authentication routes` |
| `routes/studentRoutes.ts` | `feat: add protected student routes` |
| `routes/courseRoutes.ts` | `feat: add course routes` |
| `config/database.ts` | `feat: configure MongoDB connection` |
| `app.ts` | `feat: wire application layers with dependency injection` |
| `server.ts` | `feat: add application entry point` |
| `README.md` | `docs: document setup architecture and API endpoints` |

## Important note

This is an educational starter API. Before production use, add request validation, rate limiting, password reset, refresh-token strategy, audit logging, tests, and a controlled admin-provisioning process. Do not commit `.env`.
=======
# student-management-system
>>>>>>> 02d5e3a2e9cc386fe37c12a7c214d0b3c4c89567
# Student Management System

A REST API built with TypeScript, Node.js, Express and MongoDB. It demonstrates layered architecture, OOP, SOLID-oriented dependency separation, type-safe DTOs and manual dependency injection.

## Setup

1. Install Node.js and MongoDB.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `MONGODB_URI` and a strong `JWT_SECRET`.
4. Run `npm run dev`.
5. Check `http://localhost:3000/`.

## Scripts

* `npm run dev` — development server
* `npm run typecheck` — TypeScript check
* `npm run build` — compile to `dist`
* `npm start` — run compiled server

## API

| Method | Endpoint             | Access | Purpose                  |
| ------ | -------------------- | ------ | ------------------------ |
| POST   | `/api/auth/register` | Public | Register student account |
| POST   | `/api/auth/login`    | Public | Login                    |
| GET    | `/api/courses`       | Public | List courses             |
| GET    | `/api/courses/:id`   | Public | Get course               |
| POST   | `/api/courses`       | Admin  | Create course            |
| PATCH  | `/api/courses/:id`   | Admin  | Update course            |
| DELETE | `/api/courses/:id`   | Admin  | Delete course            |
| GET    | `/api/students`      | Admin  | List student profiles    |
| GET    | `/api/students/:id`  | Admin  | Get student              |
| POST   | `/api/students`      | Admin  | Create student profile   |
| PATCH  | `/api/students/:id`  | Admin  | Update student           |
| DELETE | `/api/students/:id`  | Admin  | Delete student           |

Send protected requests with `Authorization: Bearer <token>`.

Public registration creates student accounts. Create the first admin account by changing the role in the database, then use that account to manage records.

### Example registration body

```json
{
  "name": "Hafiz",
  "email": "hafiz@example.com",
  "password": "StrongPass123"
}
```

### Example course body

```json
{
  "code": "CS101",
  "title": "Programming Fundamentals",
  "description": "Introduction to programming",
  "credits": 4
}
```

## Architecture

* `models`: OOP domain classes and Mongoose schemas
* `interfaces`: contracts and request/response types
* `repositories`: database access
* `services`: business rules
* `controllers`: HTTP request/response handling
* `routes`: endpoint definitions
* `middlewares`: authentication, authorization and errors
* `config`: database connection
* `utils`: shared helpers

## OOP and SOLID

* `User` is an abstract base class; `Student` and `Admin` inherit from it.
* `getDashboardMessage()` is overridden, demonstrating polymorphism.
* `User` keeps its role private and exposes it through a getter (encapsulation).
* Controllers depend on services; services depend on repositories, keeping responsibilities separated.
* Interfaces and DTO types define clear contracts.
* `Pick`, `Omit`, `Partial` and `Readonly` are used for request/update/response types.
* Dependencies are constructed and injected in `app.ts` (manual dependency injection).

## Important Note

This is an educational starter API. Before production use, consider adding:

* Request validation
* Rate limiting
* Password reset
* Refresh-token strategy
* Audit logging
* Automated tests
* Controlled admin provisioning

Never commit your `.env` file or expose database credentials.
