import { IStudentRepository } from "../interfaces/IStudentRepository";
import { CreateStudentInput, UpdateStudentInput } from "../interfaces/IStudent";
import { AppError } from "../utils/AppError";

export class StudentService {
  constructor(private readonly students: IStudentRepository) {}

  getAll() { return this.students.findAll(); }

  async getById(id: string) {
    const student = await this.students.findById(id);
    if (!student) throw new AppError("Student not found", 404);
    return student;
  }

  async create(input: CreateStudentInput) {
    if (await this.students.findByUserId(input.userId)) {
      throw new AppError("A student profile already exists for this user", 409);
    }
    return this.students.create(input);
  }

  async update(id: string, input: UpdateStudentInput) {
    const updated = await this.students.update(id, input);
    if (!updated) throw new AppError("Student not found", 404);
    return updated;
  }

  async delete(id: string) {
    if (!(await this.students.delete(id))) throw new AppError("Student not found", 404);
    return { message: "Student deleted successfully" };
  }
}
