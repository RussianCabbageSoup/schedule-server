import type { Char } from "@prisma/orm-postgres/target/codec-types";
import { db } from "../../prisma/db";
import { createHash } from "crypto";

class RefreshTokenService {
    async createToken(userId: Char<36>, token: string) {
        return await db.orm.public.RefreshToken.create({
            userId,
            token: createHash('sha256').update(token).digest('hex'),
            expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString()
        });
    }
}

export default new RefreshTokenService();