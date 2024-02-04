import { randomUUID } from "node:crypto"
import { getDateTime } from "../utils.js";
// import { loadData } from "../utils.js";

export class NoteModel {
  static async getNotes() {
    const NOTES = fetch("https://notes-deploy-server.vercel.app/notes")
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error al cargar las notas:", error));
    
    return NOTES || [];
  }

  static async getById({ id }) {
    const NOTES = fetch("https://notes-deploy-server.vercel.app/notes")
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error al cargar las notas:", error));
    
    return NOTES.find(note => note.id === id) || null
  }

  static async createNote({ input }) {
    const NOTES = fetch("https://notes-deploy-server.vercel.app/notes")
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error al cargar las notas:", error));

    const newNote = {
      id: randomUUID(),
      date: getDateTime(),
      ...input,
    }

    NOTES.unshift(newNote);

    return newNote || null
  }

  static async updateNote({ id, input }) {
    const NOTES = fetch("https://notes-deploy-server.vercel.app/notes")
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error al cargar las notas:", error));
    
    const noteIndex = NOTES.findIndex(note => note.id === id)

    if (noteIndex === -1) return false
      
    NOTES[noteIndex] = {
      ...NOTES[noteIndex],
      ...input
    }

    return NOTES[noteIndex] || null
  }

  static async deleteNote({ id }) {
    const NOTES = fetch("https://notes-deploy-server.vercel.app/notes")
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error al cargar las notas:", error));
    
    const noteIndex = NOTES.findIndex(note => note.id === id)

    if (noteIndex === -1) return false

    NOTES.splice(noteIndex, 1)
    return true || false
  }
}