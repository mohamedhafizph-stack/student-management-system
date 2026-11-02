export interface IStudent {
  _id?: string;
  userId: string;
  studentId: string;
  department: string;
  semester: number;
  phone?: string;
}
export type CreateStudentInput = Omit<IStudent, "_id">;
export type UpdateStudentInput = Partial<Pick<IStudent, "department" | "semester" | "phone">>;