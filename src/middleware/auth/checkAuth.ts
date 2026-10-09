import type { NextFunction, Request, Response } from "express";
import ApiError from "../../error/ApiError.js";
import jwt from "jsonwebtoken";
import type {} from "../../types/user.js";

export default function checkAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const accessToken = req.cookies.accessToken;
        
        if (!accessToken) {
            return next(ApiError.unauthorized('Не авторизован code оранжевый'));
        }

        if (!process.env.JWT_SECRET) {
            return next(ApiError.internal('JWT_SECRET не определен'));
        }

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        if (typeof decoded === 'string') {
            return next(ApiError.unauthorized('Не авторизован code голубой'));
        }

        req.user = decoded;

        next();
    } catch (error) {
        next(ApiError.unauthorized(`Не авторизован code белый`));
    }
}