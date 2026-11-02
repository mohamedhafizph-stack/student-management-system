import { Router } from "express";
import { StudentController } from "../controllers/StudentController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";

export function studentRoutes(controller: StudentController): Router {
  const router = Router();
  router.use(authenticate);
  router.get("/", authorize("admin"), asyncHandler(controller.getAll));
  router.get("/:id", authorize("admin"), asyncHandler(controller.getById));
  router.post("/", authorize("admin"), asyncHandler(controller.create));
  router.patch("/:id", authorize("admin"), asyncHandler(controller.update));
  router.delete("/:id", authorize("admin"), asyncHandler(controller.delete));
  return router;
}