import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import errorHandler from "./middleware/error/errorHandler.js";
import notFound from "./middleware/error/notFound.js";
import { networkOptions } from "./config/config.js";
import checkEnv from "./checkServer/checkEnv.js";

const PORT = networkOptions.PORT;

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.get('/', (req, res) => res.status(200).json({ message: 'OK' }));
app.use('/api', router);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        checkEnv();
        app.listen(PORT, () => console.log(`started on ${PORT}`));
    } catch (error) {
        console.error('Failed to start: ', error);
    }
};

start();