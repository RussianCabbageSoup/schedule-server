import type { NextFunction, Request, Response } from "express";
import { validateString } from "../../../utils/validators";
import ApiError from "../../../error/ApiError";

export default function userSignIn(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body || {};

        const validatedUsername = validateString(username);
        const validatedPassword = validateString(password, false);

        if (!validatedUsername) {
            return next(ApiError.badRequest('username не может быть пустым'));
        }

        if (!validatedPassword) {
            return next(ApiError.badRequest('password не может быть пустым'));
        }

        req.body.username = validatedUsername;
        req.body.password = validatedPassword;

        next();

    } catch (error) {
        next(error);
    }
}