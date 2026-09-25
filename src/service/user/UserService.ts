import ApiError from "../../error/ApiError.js";
import { db } from "../../prisma/db.js";
import { comparePassword, hashPassword } from "../../utils/auth.js";
import AuthService from "./AuthService.js";
import type { Response } from "express";

class UserService {
    async createUser(username: string, password: string, res: Response) {
        return await db.transaction(async (tx) => {
            const candidate = await tx.orm.public.User
                .where(u => u.username.eq(username))
                .first();

            if (candidate) {
                throw ApiError.conflict('Пользователь с такие именем уже существует');
            }

            const user = await tx.orm.public.User.create({
                username,
                password: await hashPassword(password),
                createdAt: new Date().toISOString()
            });

            await AuthService.createSession(user, res, tx);

            return user;
        });
    }

    async signIn(username: string, password: string, res: Response) {
        return await db.transaction(async (tx) => {
            const user = await tx.orm.public.User
                .where(u => u.username.eq(username))
                .first();

            if (!user) {
                throw ApiError.badRequest('Неверный логин или пароль');
            }

            const verify = await comparePassword(password, user.password);

            if (!verify) {
                throw ApiError.badRequest('Неверный логин или пароль');
            }

            await AuthService.createSession(user, res, tx);

            return user;
        });
    }
}

export default new UserService();