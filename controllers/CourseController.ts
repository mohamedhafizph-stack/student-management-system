import { Request, Response } from "express";
import { CourseService } from "../services/CourseService";

export class CourseController {
  constructor(private readonly courses: CourseService) {}

  getAll = async (_req: Request, res: Response) => {
    res.json(await this.courses.getAll());
  };

  getById = async (req: Request, res: Response) => {
    res.json(await this.courses.getById(String(req.params.id)));
  };

  create = async (req: Request, res: Response) => {
    res.status(201).json(await this.courses.create(req.body));
  };

  update = async (req: Request, res: Response) => {
    res.json(await this.courses.update(String(req.params.id), req.body));
  };

  delete = async (req: Request, res: Response) => {
    res.json(await this.courses.delete(String(req.params.id)));
  };
}