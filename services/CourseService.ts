import { ICourseRepository } from "../interfaces/ICourseRepository";
import { CreateCourseInput, UpdateCourseInput } from "../interfaces/ICourse";
import { AppError } from "../utils/AppError";

export class CourseService {
  constructor(private readonly courses: ICourseRepository) {}

  getAll() { return this.courses.findAll(); }

  async getById(id: string) {
    const course = await this.courses.findById(id);
    if (!course) throw new AppError("Course not found", 404);
    return course;
  }

  create(input: CreateCourseInput) { return this.courses.create(input); }

  async update(id: string, input: UpdateCourseInput) {
    const course = await this.courses.update(id, input);
    if (!course) throw new AppError("Course not found", 404);
    return course;
  }

  async delete(id: string) {
    if (!(await this.courses.delete(id))) throw new AppError("Course not found", 404);
    return { message: "Course deleted successfully" };
  }
}
