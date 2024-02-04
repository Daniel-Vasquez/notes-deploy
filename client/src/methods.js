import { getEnvValue } from './utils'
const ENDPOINT = getEnvValue('ENDPOINT');

export const createNote = async (newNoteData, setNotes) => {
  try {
    const response = await fetch(`${ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNoteData),
    });

    if (response.ok) {
      const createdNote = await response.json();
      setNotes((prevNotes) => [createdNote, ...prevNotes]);
    } else {
      console.error('Failed to create note:', response.status);
    }
  } catch (error) {
    console.error('Error creating note:', error);
  }
};

export const updateNote = async (id, updatedData, setNotes) => {
  const { content } = updatedData;

  const data = {
    content,
  };

  try {
    const response = await fetch(`${ENDPOINT}/notes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const updatedMovie = await response.json();

      setNotes((prevMovies) =>
        prevMovies.map((movie) => (movie.id === id ? updatedMovie : movie))
      );
    } else {
      console.error('Failed to update movie:', response.status);
    }
  } catch (error) {
    console.error('Error updating movie:', error);
  }
};

export const deleteNote = async (id, setNotes) => {
  try {
    await fetch(`${ENDPOINT}/notes/${id}`, {
      method: 'DELETE'
    });

    setNotes((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
};
