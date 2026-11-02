import { ICourse, CreateCourseInput, UpdateCourseInput } from "../interfaces/ICourse";
import { ICourseRepository } from "../interfaces/ICourseRepository";
import { CourseModel } from "../models/CourseModel";

export class CourseRepository implements ICourseRepository {
  async findAll(): Promise<ICourse[]> {
    return await CourseModel.find().lean() as unknown as ICourse[];
  }
  async findById(id: string): Promise<ICourse | null> {
    return await CourseModel.findById(id).lean() as unknown as ICourse | null;
  }
  async create(data: CreateCourseInput): Promise<ICourse> {
    return await CourseModel.create(data) as unknown as ICourse;
  }
  async update(id: string, data: UpdateCourseInput): Promise<ICourse | null> {
    return await CourseModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean() as unknown as ICourse | null;
  }
  async delete(id: string): Promise<boolean> {
    return (await CourseModel.findByIdAndDelete(id)) !== null;
  }
}
