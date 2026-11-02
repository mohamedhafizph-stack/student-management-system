import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { asyncHandler } from "../utils/asyncHandler";

export function authRoutes(controller: AuthController): Router {
  const router = Router();
  router.post("/register", asyncHandler(controller.register));
  router.post("/login", asyncHandler(controller.login));
  return router;
}