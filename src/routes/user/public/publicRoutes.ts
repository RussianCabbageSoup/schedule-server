import { Router } from "express";
import UserController from "../../../controllers/user/UserController.js";
import userSignUp from "../../../middleware/validation/user/userSignUp.js";
import userRefresh from "../../../middleware/validation/user/userRefresh.js";
import userSignIn from "../../../middleware/validation/user/userSignIn.js";

const router = Router();

router.post('/sign-up', userSignUp, UserController.signUp);

router.post('/refresh', userRefresh, UserController.refresh);

router.post('/sign-in', userSignIn,  UserController.signIn);

export default router;