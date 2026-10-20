import { Router } from "express";
import userRouter from "./user/index.js";
import noteRouter from "./note/index.js";
import ScheduleController from "../controllers/schedule/ScheduleController.js";
import scheduleGet from "../middleware/validation/schedule/scheduleGet.js";

const router = Router();

router.use('/user', userRouter);

router.use('/note', noteRouter);

router.get('/schedules', scheduleGet, ScheduleController.get);

export default router;