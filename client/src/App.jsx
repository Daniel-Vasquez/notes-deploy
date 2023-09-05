import { useState, useEffect } from 'react'
import { Comment } from './components/Comment'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [inputtitle, setInputTitle] = useState("")
  const [inputContent, setInputContent] = useState("")

  const allNotes = async () => {
    await fetch('https://notes-deploy-server.vercel.app/notes')
      .then((res) => res.json())
      .then((res) => setNotes(res))
      .catch(error => console.error('Error loading notes:', error));
  }

  useEffect(() => {
    allNotes()
  }, []);

  const handleClickDelete = async (id, setNotes) => {
    try {
      await fetch(`https://notes-deploy-server.vercel.app/notes/${id}`, {
        method: 'DELETE'
      });

      setNotes((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleClickCreate = async (newNoteData, setNotes) => {
    try {
      const response = await fetch('https://notes-deploy-server.vercel.app/notes', {
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

  const updateNote = async (id, updatedData, setNotes) => {
    try {
      const response = await fetch(`https://notes-deploy-server.vercel.app/notes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
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

  const handleChange = (e) => {
    setInputTitle(e.target.value);
  }

  const handleChangeContent = (e) => {
    setInputContent(e.target.value);
  }

  return (
    <section className='comments'>
      <div className="comment-card">
        <h2>
          Tu opinión es importante,
          deja tu comentario para seguir
          mejorando como programador.
        </h2>
        <div className="comment-card-inputs">
          <label className="comment-card-input">
            <input
              className="input__field"
              type="text"
              placeholder=" "
              value={inputtitle}
              onChange={handleChange}
            />
            <span className="comment-card-input__label">Title</span>
          </label>

          <label className="comment-card-input">
            <input
              className="input__field"
              type="text"
              placeholder=" "
              value={inputContent}
              onChange={handleChangeContent}
            />
            <span className="comment-card-input__label">Content</span>
          </label>
        </div>
        <div className="comment-card-buttons">
          <button
            onClick={() => handleClickCreate({ title: inputtitle, content: inputContent }, setNotes)}
            disabled={!inputtitle}
            className="comment-card-buttons__comment"
          >
            Comentar
          </button>
        </div>
      </div>
      <section className='comment'>
        {notes.map(({ id, title, content }, index) => (
          <div
            key={index}
            className='comment-card'
          >
            <Comment
              id={id}
              comment={{ title, content }}
              deleteComment={() => handleClickDelete(id, setNotes)}
              updateComment={updateNote}
            />
          </div>
        ))}
      </section>
    </section>
  )
}

export default App
