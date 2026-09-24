import type { DefaultModelRow } from "@prisma/orm-postgres/orm-client";
import jwt from "jsonwebtoken";
import type { Contract } from "../prisma/contract.d";
import ApiError from "../error/ApiError";
import crypto from "crypto";
import type { Request, Response } from "express";
import { cookieOptions } from "../config/config";

export const generateJWT = (user: DefaultModelRow<Contract, "User", "public">) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw ApiError.internal('JWT_SECRET не определен');

    return jwt.sign(
        { id: user.id, username: user.username, createdAt: user.createdAt }, 
        secret,
        { expiresIn: '15min' }
    );
}

export const generateRefreshToken = (): string => {
    return crypto.randomBytes(40).toString('hex');
};

export const setCookies = (key: string, token: string, res: Response) => {
    res.cookie(key, token, cookieOptions);
};

export const clearCookies = (res: Response) => {
    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
};