import type { NextFunction, Request, Response } from "express";
import ApiError from "../../../error/ApiError";

export default function userRefresh(req: Request, res: Response, next: NextFunction) {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken || typeof refreshToken !== 'string') {
            return next(ApiError.unauthorized('Не авторизован code 0'));
        }

        next();

    } catch (error) {
        next(error);
    }
}