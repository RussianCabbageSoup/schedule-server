import type { NextFunction, Request, Response } from "express";
import { validateDateOnly } from "../../../utils/validators.js";
import ApiError from "../../../error/ApiError.js";

export default function scheduleGet(req: Request, res: Response, next: NextFunction) {
    try {
        const { day } = req.query;

        if (typeof day !== 'string') {
            return next(ApiError.badRequest('Поле day должно быть формата YYYY-MM-DD'));
        }

        const validatedDay = validateDateOnly(day);

        if (!validatedDay) {
            return next(ApiError.badRequest('Поле day должно быть формата YYYY-MM-DD'));
        }

        req.query.day = validatedDay;

        next();
    } catch (error) {
        next(error);
    }
}
