import { randomUUID } from "node:crypto"
import { getDateTime, getAllNotes } from "../utils.js";

export class NoteModel {
  static async getNotes() {
    const response = await fetch("https://notes-deploy-server.vercel.app/notes");
    const NOTES = await response.json();
    return NOTES;
  }

  static async getById({ id }) {
    const response = await fetch(`https://notes-deploy-server.vercel.app/notes/${id}`);
    const NOTES = await response.json();
    return NOTES.find(note => note.id === id)
  }

  static async createNote({ input }) {
    const response = await fetch("https://notes-deploy-server.vercel.app/notes");
    const NOTES = await response.json();
    
    const newNote = {
      id: randomUUID(),
      date: getDateTime(),
      ...input,
    }

    NOTES.unshift(newNote);

    return newNote;
  }

  static async updateNote({ id, input }) {
    const response = await fetch(`https://notes-deploy-server.vercel.app/notes/${id}`);
    const NOTES = await response.json();

    const noteIndex = NOTES.findIndex(note => note.id === id)

    if (noteIndex === -1) return false
      
    NOTES[noteIndex] = {
      ...NOTES[noteIndex],
      ...input
    }

    return NOTES[noteIndex]
  }

  static async deleteNote({ id }) {
    const response = await fetch(`https://notes-deploy-server.vercel.app/notes/${id}`);
    const NOTES = await response.json();
    
    const noteIndex = NOTES.findIndex(note => note.id === id)

    if (noteIndex === -1) return false

    NOTES.splice(noteIndex, 1)
    return true
  }
}
