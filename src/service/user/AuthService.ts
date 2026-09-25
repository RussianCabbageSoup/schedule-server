import { generateJWT, generateRefreshToken, setCookies } from "../../utils/auth.js";
import type { Contract } from "../../prisma/contract.d";
import type { DefaultModelRow } from "@prisma/orm-postgres/orm-client";
import RefreshTokenService from "./RefreshTokenService.js";
import type { Response } from "express";
import type { Transaction } from "../../prisma/db.js";

class AuthService {
    async createSession(
        user: DefaultModelRow<Contract, "User", "public">, 
        res: Response,
        tx: Transaction
    ) {
        const accessToken = generateJWT(user);
        const refreshToken = generateRefreshToken();

        await RefreshTokenService.createToken(user.id, refreshToken, tx);

        setCookies('accessToken', accessToken, res);
        setCookies('refreshToken', refreshToken, res);
    }
}

export default new AuthService();