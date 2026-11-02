import { Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";

export function courseRoutes(controller: CourseController): Router {
  const router = Router();
  router.get("/", asyncHandler(controller.getAll));
  router.get("/:id", asyncHandler(controller.getById));
  router.post("/", authenticate, authorize("admin"), asyncHandler(controller.create));
  router.patch("/:id", authenticate, authorize("admin"), asyncHandler(controller.update));
  router.delete("/:id", authenticate, authorize("admin"), asyncHandler(controller.delete));
  return router;
}