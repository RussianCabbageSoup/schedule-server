import type { NextFunction, Request, Response } from "express";
import { validatePassword, validateString } from "../../../utils/validators.js";
import ApiError from "../../../error/ApiError.js";

export default function(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body || {};

        const validatedUsername = validateString(username);
        const validatedPassword = validatePassword(password);

        if (!validatedUsername) {
            return next(ApiError.badRequest('Имя не может быть пустым'));
        }

        if (!validatedPassword.isPass) {
            return next(ApiError.validation(validatedPassword.message));
        }

        req.body.username = validatedUsername;
        req.body.password = validatedPassword.password;
        
        next();
    } catch (error) {
        next(error);
    }
}