import { Router } from "express";
import { NoteController } from "../controllers/notesController.js";
export const notesRouter = Router();

notesRouter.get("/", NoteController.getAll);
notesRouter.get("/:id", NoteController.getId);

notesRouter.post("/", NoteController.create);
notesRouter.patch("/:id", NoteController.update);
notesRouter.delete("/:id", NoteController.delete);


