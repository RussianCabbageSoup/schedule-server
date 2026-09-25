export default class ApiError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }

    static badRequest(message: string) {
        return new ApiError(400, message);
    }

    static unauthorized(message: string) {
        return new ApiError(401, message);
    }

    static forbidden(message: string) {
        return new ApiError(403, message);
    }

    static notFound(message: string) {
        return new ApiError(404, message);
    }

    static conflict(message: string) {
        return new ApiError(409, message);
    }

    static validation(message: string) {
        return new ApiError(422, message);
    }

    static internal(message: string) {
        return new ApiError(500, message);
    }
}