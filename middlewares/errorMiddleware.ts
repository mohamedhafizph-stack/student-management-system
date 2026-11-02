import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  const status = err instanceof AppError ? err.statusCode : 500;
  res.status(status).json({
    message: err.message || "Internal server error"
  });
}