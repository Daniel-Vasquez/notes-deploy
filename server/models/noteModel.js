import { randomUUID } from "node:crypto"
// import { getDateTime } from "../utils.js";

const NOTES = [
  {
    "id": "1693845439847",
    // "date": "2024-02-03",
    "content": "La tecnología avanza rápidamente y lo que es innovador hoy puede volverse obsoleto en poco tiempo."
  },
]

export class NoteModel {
  static async getNotes() {
    return NOTES;
  }

  static async getById({id}) {
    return NOTES.find(note => note.id === id)
  }

  static async createNote({ input }) {
    const newNote = {
      id: randomUUID(),
      // date: getDateTime(),
      ...input,
    }

    NOTES.unshift(newNote);

    return newNote;
  }

  static async updateNote({ id, input }) {
    const noteIndex = NOTES.findIndex(note => note.id === id)

    if (noteIndex === -1) return false
      
    NOTES[noteIndex] = {
      ...NOTES[noteIndex],
      ...input
    }

    return NOTES[noteIndex]
  }

  static async deleteNote({ id }) {
    const noteIndex = NOTES.findIndex(note => note.id === id)

    if (noteIndex === -1) return false

    NOTES.splice(noteIndex, 1)
    return true
  }
}