import type { NextFunction, Request, Response } from "express";
import UserService from "../../service/user/UserService.js";
import ApiError from "../../error/ApiError.js";
import RefreshTokenService from "../../service/user/RefreshTokenService.js";

class UserController {
    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;

            const user = await UserService.createUser(username, password, res);

            return res.json({
                username: user.username
            });
        } catch (error) {
            next(error);
        }
    }

    async checkAuth(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.user) return next(ApiError.unauthorized('Не авторизован code 4'));
            return res.json({ username: req.user.username });
        } catch (error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshToken;

            const user = await RefreshTokenService.verify(refreshToken, res);

            return res.json({
                id: user.id,
                username: user.username,
                createdAt: user.createdAt
            });
        } catch (error) {
            next(error);
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;

            const user = await UserService.signIn(username, password, res);

            return res.json({
                id: user.id,
                username: user.username,
                createdAt: user.createdAt
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();