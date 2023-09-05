import { randomUUID } from "node:crypto"
// import { loadData } from "../utils.js";
const NOTES = [
  {
    "id": "1693845439847",
    "content": "La tecnología avanza rápidamente y lo que es innovador hoy puede volverse obsoleto en poco tiempo."
  },
  {
    "id": "1693843949847",
    "content": "La tecnología ha transformado la forma en que vivimos, trabajamos y nos relacionamos, generando tanto oportunidades como desafíos."
  },
  {
    "id": "1693843954012",
    "content": "La tecnología, especialmente Internet, ha conectado a personas de todo el mundo, impulsando la globalización y cambiando la forma en que interactuamos y hacemos negocios."
  }
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
