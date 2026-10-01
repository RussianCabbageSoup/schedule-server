import { Router } from "express";
import userRouter from "./user/index.js";
import noteRouter from "./note/index.js";

const router = Router();

router.use('/user', userRouter);

router.use('/note', noteRouter);

export default router;