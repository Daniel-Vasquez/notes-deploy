import { randomUUID } from "node:crypto"
// import { getDateTime } from "../utils.js";
// import { loadData } from "../utils.js";

const NOTES = [
  {
    "id": "1693845439877",
    "content": "La tecnología avanza rápidamente y lo que es innovador hoy puede volverse obsoleto en poco tiempo."
  },
  {
    "id": "1693845439847",
    "content": "La tecnología avanza rápidamente y lo que es innovador hoy puede volverse obsoleto en poco tiempo."
  },
  {
    "id": "1693843949847",
    "content": "Hay una fuerza motriz más poderosa que el vapor, la electricidad y la energía atómica: la voluntad – Albert Einstein."
  },
  {
    "id": "1693843954012",
    "content": "La única manera de hacer un gran trabajo es amar lo que haces."
  },
  {
    "id": "1693843954013",
    "content": "La vida es lo que pasa mientras estás ocupado haciendo otros planes."
  },
  {
    "id": "1693843954014",
    "content": "No hay más grande error que no hacer nada porque solo puedes hacer un poco."
  },
  {
    "id": "1693843954015",
    "content": "La única constante en la vida es el cambio."
  },
  {
    "id": "1693843954016",
    "content": "La educación es el arma más poderosa que puedes usar para cambiar el mundo."
  },
  {
    "id": "1693843954017",
    "content": "La imaginación es más importante que el conocimiento."
  },
  {
    "id": "1693843954018",
    "content": "No puedes esperar resultados diferentes si sigues haciendo lo mismo."
  },
  {
    "id": "1693843954019",
    "content": "La verdad te hará libre, pero primero te hará enfadar."
  },
  {
    "id": "1693843954020",
    "content": "La vida es 10% lo que nos sucede y 90% cómo reaccionamos ante ello."
  },
  {
    "id": "1693843954021",
    "content": "No dejes que lo que no puedes hacer interfiera con lo que puedes hacer."
  }
];

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

    NOTES.push(newNote);

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