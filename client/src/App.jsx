import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])

  const allNotes = async () => {
    await fetch('https://notes-deploy-server.vercel.app/notes')
      .then((res) => res.json())
      .then((res) => setNotes(res))
      .catch(error => console.error('Error loading notes:', error));
  }

  useEffect(() => {
    allNotes()
  }, []);

  const deleteMovie = async (id, setMovies) => {
    try {
      await fetch(`https://notes-deploy-server.vercel.app/notes/${id}`, {
        method: 'DELETE'
      });

      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleClick = (id) => {
    deleteMovie(id, setNotes)
  }

  return (
    <div>
      {notes.map(({ id, title, content }, index) => (
        <div key={index}>
          <h3>{title}</h3>
          <p>{content}</p>
          <button onClick={() => handleClick(id)}>Eliminar</button>
        </div>
      ))}
    </div>
  )
}

export default App
