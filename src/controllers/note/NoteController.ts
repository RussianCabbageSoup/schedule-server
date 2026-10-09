import type { NextFunction, Request, Response } from "express";
import NoteService from "../../service/note/NoteService.js";

class NoteController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, content, date, isGlobal } = req.body;

            const note = await NoteService.create(userId, content, date, isGlobal);

            return res.json({ message: 'заметка создана', note });
        } catch (error) {
            next(error);
        }
    }
}

export default new NoteController();