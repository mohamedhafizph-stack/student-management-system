import express from "express";
import cors from "cors";
import path from "path";

import { AuthController } from "./controllers/AuthController";
import { StudentController } from "./controllers/StudentController";
import { CourseController } from "./controllers/CourseController";

import { AuthService } from "./services/AuthService";
import { StudentService } from "./services/StudentService";
import { CourseService } from "./services/CourseService";

import { StudentRepository } from "./repositories/StudentRepository";
import { CourseRepository } from "./repositories/CourseRepository";

import { authRoutes } from "./routes/authRoutes";
import { studentRoutes } from "./routes/studentRoutes";
import { courseRoutes } from "./routes/courseRoutes";

import { errorMiddleware } from "./middlewares/errorMiddleware";

// Dependency Injection
const studentRepository = new StudentRepository();
const courseRepository = new CourseRepository();

const authController = new AuthController(new AuthService());
const studentController = new StudentController(
    new StudentService(studentRepository)
);
const courseController = new CourseController(
    new CourseService(courseRepository)
);

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(process.cwd(), "public")));

// API health check
app.get("/api", (_req, res) => {
    res.json({ message: "Student Management API is running" });
});

// API routes
app.use("/api/auth", authRoutes(authController));
app.use("/api/students", studentRoutes(studentController));
app.use("/api/courses", courseRoutes(courseController));

app.use(errorMiddleware);

export default app;