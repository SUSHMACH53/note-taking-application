import express from "express";
import { getNotes, createNote,updateNote, deleteNote,getNoteById } from "../controllers/notesControllers.js";
import { get } from "mongoose";

const router = express.Router();

// GET /api/notes
router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
