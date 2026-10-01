import type { Char } from "@prisma/orm-postgres/target/codec-types";
import { db } from "../../prisma/db.js";

class NoteService {
    async create(userId: Char<36>, content: string, date: string, isGlobal: boolean) {
        return await db.orm.public.Note.create({
            userId,
            content,
            date,
            isGlobal
        });
    }
}

export default new NoteService();