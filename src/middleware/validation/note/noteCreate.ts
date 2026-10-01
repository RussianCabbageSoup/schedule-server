import type { NextFunction, Request, Response } from "express";
import { validateBool, validateDate, validateString } from "../../../utils/validators.js";
import ApiError from "../../../error/ApiError.js";

export default function noteCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.user || {};
        const { content, date, global } = req.body || {};

        if (!id) {
            return next(ApiError.unauthorized('Не авторизован: code красный'));
        }

        const validatedContent = validateString(content, true);
        const validatedDate = validateDate(date);
        const isGlobal = validateBool(global);

        if (!validatedContent) {
            return next(ApiError.badRequest('Поле content не определено'));
        }

        if (!validatedDate) {
            return next(ApiError.badRequest('Поле date должно быть формата YYYY-MM-DDTHH:mm:ss.sssZ'));
        }

        if (isGlobal === null) {
            return next(ApiError.badRequest('Поле global не определено'));
        }

        req.body.userId = id;
        req.body.content = validatedContent;
        req.body.date = validatedDate;
        req.body.isGlobal = isGlobal;

        next();
    } catch (error) {
        next(error);
    }
}