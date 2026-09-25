import { Router } from "express";
import publicRouter from "./public/publicRoutes.js";
import authRouter from "./auth/authRoutes.js";
import checkAuth from "../../middleware/auth/checkAuth.js";

const router = Router();

router.use('/', publicRouter);

router.use('/me', checkAuth, authRouter);

export default router;