import type { Char } from "@prisma/orm-postgres/target/codec-types";
import { db } from "../../prisma/db";

class RefreshTokenService {
    async createToken(userId: Char<36>, token: string) {
        return await db.orm.public.RefreshToken.create({
            userId,
            token,
            expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString()
        });
    }
}

export default new RefreshTokenService();