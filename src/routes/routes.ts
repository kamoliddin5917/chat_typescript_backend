import { Router } from "express";

const router = Router();

import register from "../modules/register/route";
import login from "../modules/login/route";
import message from "../modules/message/route";
import user from "../modules/user/route";

router.use("/auth", register);
router.use("/auth", login);
router.use("/api", message);
router.use("/api", user);

export default router;
