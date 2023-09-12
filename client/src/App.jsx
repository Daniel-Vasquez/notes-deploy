import { useState, useEffect } from 'react'
import { Comment } from './components/Comment'
import { Form } from './components/Form'
import { Loading } from './components/Loading'
import { createNote, updateNote, deleteNote } from './methods'
import { getEnvValue } from './utils'
import './App.css'

const ENDPOINT = getEnvValue('ENDPOINT');

export function App() {
  const [notes, setNotes] = useState([])
  const [inputContent, setInputContent] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const allNotes = async () => {
    await fetch(`${ENDPOINT}/notes`)
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
    return <Loading />
  }

  return (
    <section className='comments'>
      <div className="comment-card">
        <h2>
          Tu opinión es importante,
          deja tu comentario para seguir
          mejorando como programador.
        </h2>
        <Form
          value={inputContent}
          onChange={handleChangeContent}
          onSubmit={handleSubmitCreate}
        />
      </div>
      <section className='comment'>
        {!notes.length &&
          <h1 className="comment-title">
            No hay comentarios
          </h1>
        }

        {notes.map((note, index) => (
          <div key={index} className='comment-card'>
            <Comment
              notes={notes}
              note={note}
              deleteComment={() => handleClickDelete(note.id, setNotes)}
              updateComment={(updatedData) =>
                handleClickUpdate(note.id, updatedData, setNotes)
              }
            />
          </div>
        ))}
      </section>
    </section>
  )
}
