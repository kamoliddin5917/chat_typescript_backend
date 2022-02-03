import { Router } from "express";
import controller from "./controller";
import middleware from "../../middlewares/auth";

const router = Router();

router
  .get("/message", middleware.AUTH_USER, controller.GET)

  .post("/message", middleware.AUTH_USER, controller.POST)

  .delete("/message/:messageId", middleware.AUTH_USER, controller.DELETE);

export default router;
