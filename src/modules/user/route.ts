import { Router } from "express";
import controller from "./controller";
import middleware from "../../middlewares/auth";

const router = Router();

router.get("/user", middleware.AUTH_USER, controller.GET);

export default router;
