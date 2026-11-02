export interface ICourse {
  _id?: string;
  code: string;
  title: string;
  description?: string;
  credits: number;
}
export type CreateCourseInput = Omit<ICourse, "_id">;
export type UpdateCourseInput = Partial<Pick<ICourse, "title" | "description" | "credits">>;