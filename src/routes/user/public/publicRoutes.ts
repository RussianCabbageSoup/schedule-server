import { Router } from "express";
import UserController from "../../../controllers/user/UserController.js";
import userSignUp from "../../../middleware/validation/user/userSignUp.js";

const router = Router();

router.post('/sign-up', userSignUp, UserController.signUp);

export default router;