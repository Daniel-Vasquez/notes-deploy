import { readFile } from 'fs/promises';
const archivoJSON = 'notes.json';

export async function loadData() {
  try {
    const data = await readFile(archivoJSON, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al cargar los datos JSON:', error);
    return null;
  }
}
