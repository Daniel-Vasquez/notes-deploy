import { useState } from 'react';
import { newDateComment } from '../../utils';
import './index.css';

export function Comment({ notes, note, deleteComment, updateComment }) {
  const { id, content } = note;
  const [isEditing, setIsEditing] = useState(false);
  const [inputTextEdit, setInputTextEdit] = useState(content ? content : '')
  const [selectNote, setSelectNote] = useState(null);

  const handleUpdateClick = (id) => {
    setIsEditing(true);
    setSelectNote(id)
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    const noteIndex = notes.findIndex((note) => note.id === selectNote)

    const updatedCommentEdit = {
      ...noteIndex[noteIndex],
      content: inputTextEdit
    }

    updateComment(updatedCommentEdit);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setInputTextEdit(content ? content : "")
  };

  const handleChange = (e) => {
    setInputTextEdit(e.target.value);
  }

  return (
    <div className="note">
      {isEditing ? (
        <>
          <h3 className="note-title">Edita tu comentario:</h3>
          <form className="note-form" onSubmit={handleSaveClick}>
            <input
              className="input__field"
              value={inputTextEdit}
              placeholder='Escribe tu comentario'
              onChange={handleChange}
            />
            <div className="comment-card-buttons">
              <button
                type='submit'
                className="comment-card-buttons__comment"
                disabled={inputTextEdit === content || inputTextEdit === ""}
              >
                Guardar
              </button>
              <button
                type='button'
                className="comment-card-buttons__comment"
                onClick={handleCancelClick}
                style={{
                  backgroundColor: 'red'
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <p className="note-content">
            {content}, <strong>{newDateComment()}.</strong>
          </p>
          <div className="comment-card-buttons">
            {/* <button
              className="comment-card-buttons__comment"
              onClick={() => handleUpdateClick(id)}
            >
              Editar
            </button> */}
            {/* <button
              className="comment-card-buttons__comment"
              onClick={deleteComment}
              style={{
                backgroundColor: 'red'
              }}
            >
              Eliminar
            </button> */}
          </div>
        </>
      )
      }
    </div >
  );
}
