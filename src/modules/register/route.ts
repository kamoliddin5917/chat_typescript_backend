import { Router } from "express";
import controller from "./controller";

const router = Router();

router.post("/register", controller.POST);

export default router;
