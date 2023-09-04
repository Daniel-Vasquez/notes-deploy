import { randomUUID } from "node:crypto"
// import { readJSON } from "../utils.js";
// const notes = readJSON('./notes.json')
const notes = [
  {
    "id": "1693845439847",
    "title": "Evolución constante",
    "content": "La tecnología avanza rápidamente y lo que es innovador hoy puede volverse obsoleto en poco tiempo."
  },
  {
    "id": "1693843949847",
    "title": "Impacto en la sociedad",
    "content": "La tecnología ha transformado la forma en que vivimos, trabajamos y nos relacionamos, generando tanto oportunidades como desafíos."
  }
]

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