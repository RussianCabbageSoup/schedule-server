import ApiError from "../../error/ApiError";
import { db } from "../../prisma/db";
import { comparePassword, hashPassword } from "../../utils/auth";
import AuthService from "./AuthService";
import type { Request, Response } from "express";

class UserService {
    async createUser(username: string, password: string, res: Response) {
        const candidate = await db.orm.public.User
            .where(u => u.username.eq(username))
            .first();

        if (candidate) {
            throw ApiError.conflict('Пользователь с такие именем уже существует');
        }

        const user = await db.orm.public.User.create({
            username,
            password: await hashPassword(password),
            createdAt: new Date().toISOString()
        });

        await AuthService.createSession(user, res);

        return user;
    }

    async signIn(username: string, password: string) {
        const user = await db.orm.public.User
            .where(u => u.username.eq(username))
            .first();

        if (!user) {
            throw ApiError.badRequest('Неверный логин или пароль');
        }

        const verify = await comparePassword(password, user.password);

        if (!verify) {
            throw ApiError.badRequest('Неверный логин или пароль');
        }

        return user;
    }
}

export default new UserService();