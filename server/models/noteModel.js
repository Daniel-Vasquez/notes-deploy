import { randomUUID } from "node:crypto"
import { getDateTime, getAllNotes } from "../utils.js";

export class NoteModel {
  static async getNotes() {
    const NOTES = await getAllNotes()
    return NOTES;
  }

  static async getById({ id }) {
    const NOTES = await getAllNotes()
    return NOTES.find(note => note.id === id)
  }

  static async createNote({ input }) {
    const NOTES = await getAllNotes()
    const newNote = {
      id: randomUUID(),
      date: getDateTime(),
      ...input,
    }

    NOTES.unshift(newNote);

    return newNote;
  }

  static async updateNote({ id, input }) {
    const NOTES = await getAllNotes()
    const noteIndex = NOTES.findIndex(note => note.id === id)

    if (noteIndex === -1) return false
      
    NOTES[noteIndex] = {
      ...NOTES[noteIndex],
      ...input
    }

    return NOTES[noteIndex]
  }

  static async deleteNote({ id }) {
    const NOTES = await getAllNotes()
    const noteIndex = NOTES.findIndex(note => note.id === id)

    if (noteIndex === -1) return false

    NOTES.splice(noteIndex, 1)
    return true
  }
}
