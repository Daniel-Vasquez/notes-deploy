import { NoteModel } from "../models/noteModel.js";
import { validateNote, validatePartialNote } from "../schemas/validationScheme.js";

export class NoteController {
  static async getAll(req, res) {
    const notes = await NoteModel.getNotes()

    res.json(notes)
  }

  static async getId(req, res) {
    const { id } = req.params
  
    const findNote = await NoteModel.getById({ id })
  
    if (!findNote) {
      return res.status(404).json({ message: 'Note not found' })
    }
  
    res.json(findNote)
  }

  static async create(req, res) {
    const result = validateNote(req.body)
    
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    } 
  
    const newNote = await NoteModel.createNote({ input: result.data })
  
    res.status(201).json(newNote);
  }

  static async update(req, res) {
    const result = validatePartialNote(req.body)
  
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    } 
  
    const { id } = req.params;
    const updateNote = await NoteModel.updateNote({ id, input: result.data })
  
    res.json(updateNote)
  }

  static async delete(req, res) {
    const { id } = req.params
  
    const result = await NoteModel.deleteNote({ id })
    
    if (result === false) {
      return res.status(404).json({ message: 'Note not found' })
    }
  
    return res.json({ message: 'Note deleted' })
  }
}