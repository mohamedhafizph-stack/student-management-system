import { IRepository } from "./IRepository";
import { IStudent, CreateStudentInput, UpdateStudentInput } from "./IStudent";

export interface IStudentRepository extends IRepository<IStudent, CreateStudentInput, UpdateStudentInput> {
  findByUserId(userId: string): Promise<IStudent | null>;
}
