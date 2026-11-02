import { IStudent, CreateStudentInput, UpdateStudentInput } from "../interfaces/IStudent";
import { IStudentRepository } from "../interfaces/IStudentRepository";
import { StudentModel } from "../models/StudentModel";

export class StudentRepository implements IStudentRepository {
  async findAll(): Promise<IStudent[]> {
    return await StudentModel.find()
        .populate("userId", "name email")
        .lean() as unknown as IStudent[];
}
  async findById(id: string): Promise<IStudent | null> {
    return await StudentModel.findById(id).lean() as unknown as IStudent | null;
  }
  async findByUserId(userId: string): Promise<IStudent | null> {
    return await StudentModel.findOne({ userId }).lean() as unknown as IStudent | null;
  }
  async create(data: CreateStudentInput): Promise<IStudent> {
    return await StudentModel.create(data) as unknown as IStudent;
  }
  async update(id: string, data: UpdateStudentInput): Promise<IStudent | null> {
    return await StudentModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean() as unknown as IStudent | null;
  }
  async delete(id: string): Promise<boolean> {
    return (await StudentModel.findByIdAndDelete(id)) !== null;
  }
}
