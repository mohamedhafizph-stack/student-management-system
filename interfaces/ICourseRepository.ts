import { IRepository } from "./IRepository";
import { ICourse, CreateCourseInput, UpdateCourseInput } from "./ICourse";

export interface ICourseRepository extends IRepository<ICourse, CreateCourseInput, UpdateCourseInput> {}
