import type { CookieOptions } from "express";

export const networkOptions = {
    PORT: Number(process.env.PORT) || 5000,
    corsOrigins: process.env.CORS_ORIGINS?.split(',').map(origin => origin.trim()) ||
        ['http://localhost:3000', 'http://127.0.0.1:3000']
};

const isProduction = process.env.NODE_ENV !== 'development';

export const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    // SameSite=None обязателен для кросс-доменных запросов из Capacitor-WebView
    // (https://localhost -> https://schedule-server-rho.vercel.app)
    sameSite: isProduction ? "none" : "lax",
    maxAge: Number(process.env.COOKIE_MAX_AGE || 30 * 24 * 60 * 60 * 1000)
};