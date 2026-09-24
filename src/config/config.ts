export const networkOptions = {
    PORT: Number(process.env.PORT) || 5000
};

type SameSite = "lax";

export const cookieOptions = {
    httpOnly: true,
    secure: String(process.env.NODE_ENV) !== 'development',
    sameSite: "lax" as SameSite, 
    maxAge: Number(process.env.COOKIE_MAX_AGE || 30 * 24 * 60 * 60 * 1000)
};