import type { DefaultModelRow } from "@prisma/orm-postgres/orm-client";
import jwt from "jsonwebtoken";
import type { Contract } from "../prisma/contract.d";
import ApiError from "../error/ApiError.js";
import crypto from "crypto";
import type { Response } from "express";
import { cookieOptions } from "../config/config.js";
import bcrypt from "bcrypt";

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

export const hashToken = (token: string) => {
    return crypto.createHash('sha256').update(token).digest('hex')
};

export const hashPassword = async (password: string, salt = 10) => {
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};