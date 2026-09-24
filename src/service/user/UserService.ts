import ApiError from "../../error/ApiError";
import { db } from "../../prisma/db";
import bcrypt from "bcrypt";
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
            password: await bcrypt.hash(password, 10),
            createdAt: new Date().toISOString()
        });

        await AuthService.createSession(user, res);

        return user;
    }
}

export default new UserService();