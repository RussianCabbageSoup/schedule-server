import { Router } from "express";
import authRouter from "./auth/authRouter.js";
import checkAuth from "../../middleware/auth/checkAuth.js";

const router = Router();

router.use('/', checkAuth, authRouter);

export default router;