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

export function getDateTime() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
  const day = String(now.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}
