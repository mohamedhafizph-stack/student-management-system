import { Request, Response } from "express";
import { StudentService } from "../services/StudentService";

export class StudentController {
  constructor(private readonly students: StudentService) {}

  getAll = async (_req: Request, res: Response) => {
    res.json(await this.students.getAll());
  };

  getById = async (req: Request, res: Response) => {
    res.json(await this.students.getById(String(req.params.id)));
  };

  create = async (req: Request, res: Response) => {
    res.status(201).json(await this.students.create(req.body));
  };

  update = async (req: Request, res: Response) => {
    res.json(await this.students.update(String(req.params.id), req.body));
  };

  delete = async (req: Request, res: Response) => {
    res.json(await this.students.delete(String(req.params.id)));
  };
}