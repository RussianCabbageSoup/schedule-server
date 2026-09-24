import type { NextFunction, Request, Response } from "express"
import ApiError from "../../error/ApiError.js"

export default function notFound(req: Request, res: Response, next: NextFunction) {
    next(ApiError.notFound(`Маршрут ${req.method} ${req.originalUrl} не найден`));
}