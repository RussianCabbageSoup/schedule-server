import { Router } from "express";
import noteCreate from "../../../middleware/validation/note/noteCreate.js";
import NoteController from "../../../controllers/note/NoteController.js";

const router = Router();

router.post('/', noteCreate, NoteController.create);

export default router;