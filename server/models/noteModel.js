import { randomUUID } from "node:crypto"
import { getDateTime, getAllNotes } from "../utils.js";

// const NOTES = [
//   {
//     id: "1",
//     date: getDateTime(),
//     content: "This is a note",
//   }
// ];

export class NoteModel {
  static async getNotes() {
    const NOTES = await getAllNotes();
    
    if (!NOTES) {
      return []
    }

    return NOTES || [];
  }

  static async getById({ id }) {
    const NOTES = await getAllNotes();

    if (!NOTES) {
      return []
    }

    return NOTES.find(note => note.id === id)
  }

  static async createNote({ input }) {
    const NOTES = await getAllNotes();

    const newNote = {
      id: randomUUID(),
      // date: getDateTime(),
      ...input,
    }

    NOTES.unshift(newNote);

    return newNote;
  }

  static async updateNote({ id, input }) {
    const NOTES = await getAllNotes();

    if (!NOTES) {
      return []
    }
    
    const noteIndex = NOTES.findIndex(note => note.id === id)

    if (noteIndex === -1) return false
      
    NOTES[noteIndex] = {
      ...NOTES[noteIndex],
      ...input
    }

    return NOTES[noteIndex] || []
  }

  static async deleteNote({ id }) {
    const NOTES = await getAllNotes();

    if (!NOTES) {
      return false
    }

    const noteIndex = NOTES.findIndex(note => note.id === id)

    if (noteIndex === -1) return false

    NOTES.splice(noteIndex, 1)
    return true || false
  }
}