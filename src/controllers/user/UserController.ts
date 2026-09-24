import type { NextFunction, Request, Response } from "express";
import UserService from "../../service/user/UserService.js";

class UserController {
    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;

            const user = await UserService.createUser(username, password);

            return res.json({
                username: user.username
            });
        } catch (error) {
            next(error);
        }

    }
}

export default new UserController();