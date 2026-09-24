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

    static notFound(message: string) {
        return new ApiError(404, message);
    }

    static validation(message: string) {
        return new ApiError(422, message);
    }
}