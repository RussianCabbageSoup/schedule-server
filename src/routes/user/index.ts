import { Router } from "express";
import publicRouter from "./public/publicRoutes.js";

const router = Router();

router.use('/', publicRouter);

export default router;