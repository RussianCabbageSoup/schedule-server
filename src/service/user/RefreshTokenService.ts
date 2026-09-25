import type { Char } from "@prisma/orm-postgres/target/codec-types";
import { db } from "../../prisma/db";
import ApiError from "../../error/ApiError";
import { hashToken } from "../../utils/auth";

class RefreshTokenService {
    async createToken(userId: Char<36>, token: string) {
        return await db.orm.public.RefreshToken.create({
            userId,
            token: hashToken(token),
            expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString()
        });
    }

    async destroyExpired(userId: Char<36>) {
        return await db.orm.public.RefreshToken
            .where(t => t.userId.eq(userId))
            .where(t=> t.expireAt.lte(new Date().toISOString()))
            .deleteAll();
    }

    async destroyById(tokenId: Char<36>) {
        return await db.orm.public.RefreshToken
            .where(t => t.id.eq(tokenId))
            .delete();
    }

    async verify(token: string) {
        const candidate = await db.orm.public.RefreshToken
            .where(r => r.token.eq(hashToken(token)))
            .first();

        if (!candidate) {
            throw ApiError.unauthorized('Не авторизован code 2.0');
        }

        if (new Date().toISOString() > candidate.expireAt) {
            throw ApiError.unauthorized('Сессия истекла');
        }

        const user = await db.orm.public.User
            .where(u => u.id.eq(candidate.userId))
            .first();

        if (!user) {
            throw ApiError.badRequest('Пользователь не определен');
        }

        await this.destroyExpired(user.id);
        await this.destroyById(candidate.id);

        return user;
    }
}

export default new RefreshTokenService();