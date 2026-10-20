import axios from "axios";
import type { NextFunction, Request, Response } from "express";
import ApiError from "../../error/ApiError.js";

const ERP_URL = 'https://erp.pkgh.ru/api/Rasp';
const ERP_ID_GROUP = 13067;
const ERP_TIMEOUT = 10000;

class ScheduleController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { day } = req.query;

            const { data } = await axios.get(ERP_URL, {
                params: { idGroup: ERP_ID_GROUP, sdate: day },
                timeout: ERP_TIMEOUT
            });

            return res.json(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return next(ApiError.internal(error.message));
            }
            next(error);
        }
    }
}

export default new ScheduleController();
