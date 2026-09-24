import ApiError from "../../error/ApiError";
import { db } from "../../prisma/db";
import bcrypt from "bcrypt";

class UserService {
    async createUser(username: string, password: string) {
        const candidate = await db.orm.public.User
        .where(u => u.username.eq(username))
        .first();

        if (candidate) {
            throw ApiError.conflict('Пользователь с такие именем уже существует');
        }

        return await db.orm.public.User.create({
            username,
            password: await bcrypt.hash(password, 10),
            createdAt: new Date().toISOString()
        });
    }
}

export default new UserService();