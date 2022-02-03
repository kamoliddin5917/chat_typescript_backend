import { Router } from "express";
import controller from "./controller";

const router = Router();

router.post("/login", controller.POST);

export default router;
