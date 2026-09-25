import cors, { type CorsOptions } from "cors";
import ApiError from "../../error/ApiError.js";
import { networkOptions } from "../../config/config.js";

let allowedOrigins: string[] = [];

if (process.env.ALLOWED_ORIGIN) {
    allowedOrigins.push(process.env.ALLOWED_ORIGIN);
}

if (process.env.NODE_ENV === 'development') {
    allowedOrigins.push(...networkOptions.corsOrigins);
}


const options: CorsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }
        if (origin === 'http://localhost:5173') {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        console.warn(`CORS Blocked: ${origin}`);
        return callback(ApiError.forbidden('Blocked by CORS'));
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['POST', 'GET', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

export default cors(options);