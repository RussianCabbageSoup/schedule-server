import cors, { type CorsOptions } from "cors";
import ApiError from "../../error/ApiError.js";
import { networkOptions } from "../../config/config.js";

const parseOrigins = (value?: string): string[] =>
    value?.split(',').map(origin => origin.trim()).filter(Boolean) ?? [];

const allowedOrigins = new Set<string>([
    ...parseOrigins(process.env.ALLOWED_ORIGINS),
    ...parseOrigins(process.env.ALLOWED_ORIGIN), // устаревшая переменная, оставлена для совместимости
    'http://localhost:5173',   // Vite dev
    'https://localhost',       // Capacitor Android (androidScheme: https)
    'http://localhost',        // Capacitor Android (androidScheme: http)
    'capacitor://localhost',   // Capacitor iOS
]);

if (process.env.NODE_ENV === 'development') {
    networkOptions.corsOrigins.forEach(origin => allowedOrigins.add(origin));
}


const options: CorsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.has(origin)) {
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