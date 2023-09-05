import { useState, useEffect } from 'react'
import { Comment } from './components/Comment'
import { createNote, updateNote, deleteNote  } from './methods'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [inputContent, setInputContent] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const allNotes = async () => {
    await fetch('https://notes-deploy-server.vercel.app/notes')
      .then((res) => res.json())
      .then((res) => setNotes(res))
      .catch(error => console.error('Error loading notes:', error));
  }

  useEffect(() => {
    allNotes()
  }, []);

  const handleSubmitCreate = async (e) => { 
    e.preventDefault();

    setIsLoading(true);
    await createNote({ content: inputContent }, setNotes);
    setIsLoading(false);

    setInputContent("");
    allNotes()
  }

  const handleClickUpdate = async (id, updatedData, setNotes) => {
    setIsLoading(true);
    await updateNote(id, updatedData, setNotes)
    setIsLoading(false);

    setInputContent("");
    allNotes()
  }
  
  const handleClickDelete = async (id, setNotes) => {
    setIsLoading(true);
    await deleteNote(id, setNotes)
    setIsLoading(false);

    setInputContent("");
    allNotes()
  }

  const handleChangeContent = (e) => {
    setInputContent(e.target.value);
  }

  if (isLoading) { 
    return <h1>Loading...</h1>
  }

  return (
    <section className='comments'>
      <div className="comment-card">
        <h2>
          Tu opinión es importante,
          deja tu comentario para seguir
          mejorando como programador.
        </h2>
        <form className="comment-card-inputs" onSubmit={handleSubmitCreate}>
          <label className="comment-card-input">
            <input
              className="input__field"
              type="text"
              placeholder=" "
              value={inputContent}
              onChange={handleChangeContent}
            />
            <span className="comment-card-input__label">Comentario</span>
          </label>
          <div className="comment-card-buttons">
            <button
              type='submit'
              disabled={!inputContent}
              className="comment-card-buttons__comment"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
      <section className='comment'>
        {!notes.length && <h1 style={{ textAlign: 'center' }}>No hay comentarios</h1>}
        
        {notes.map((note, index) => (
          <div
            key={index}
            className='comment-card'
          >
            <Comment
              notes={notes}
              note={note}
              deleteComment={() => handleClickDelete(note.id, setNotes)}
              updateComment={(updatedData) => handleClickUpdate(note.id, updatedData, setNotes)}
            />
          </div>
        ))}
      </section>
    </section>
  )
}

export default App
