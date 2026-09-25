import { Router } from "express";
import UserController from "../../../controllers/user/UserController.js";

const router = Router();

router.get('/auth', UserController.checkAuth);

export default router;