import { randomUUID } from "node:crypto"
import { loadData } from "../utils.js";
const notes = await loadData();

export class NoteModel {
  static async getNotes() {
    return notes;
  }

  static async getById({id}) {
    return notes.find(note => note.id === id)
  }

  static async createNote({ input }) {
    const newNote = {
      id: randomUUID(),
      ...input,
    }

    notes.unshift(newNote);

    return newNote;
  }

  static async updateNote({ id, input }) {
    const noteIndex = notes.findIndex(note => note.id === id)

    if (noteIndex === -1) return false
      
    notes[noteIndex] = {
      ...notes[noteIndex],
      ...input
    }

    return notes[noteIndex]
  }

  static async deleteNote({ id }) {
    const noteIndex = notes.findIndex(note => note.id === id)

    if (noteIndex === -1) return false

    notes.splice(noteIndex, 1)
    return true
  }
}
