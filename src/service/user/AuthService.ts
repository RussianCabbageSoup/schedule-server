import { generateJWT, generateRefreshToken, setCookies } from "../../utils/auth";
import type { Contract } from "../../prisma/contract.d";
import type { DefaultModelRow } from "@prisma/orm-postgres/orm-client";
import RefreshTokenService from "./RefreshTokenService";
import type { Response } from "express";

class AuthService {
    async createSession(user: DefaultModelRow<Contract, "User", "public">, res: Response) {
        const accessToken = generateJWT(user);
        const refreshToken = generateRefreshToken();

        await RefreshTokenService.createToken(user.id, refreshToken);

        setCookies('accessToken', accessToken, res);
        setCookies('refreshToken', refreshToken, res);
    }
}

export default new AuthService();