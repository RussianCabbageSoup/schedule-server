import ApiError from "../error/ApiError.js";

export default function checkEnv() {
    if (!process.env.JWT_SECRET) {
        throw ApiError.internal('JWT_SECRET не определен');
    }
}