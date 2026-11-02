import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  constructor(private readonly auth: AuthService) {}
  register = async (req: Request, res: Response) => res.status(201).json(await this.auth.register(req.body));
  login = async (req: Request, res: Response) => res.status(200).json(await this.auth.login(req.body));
}