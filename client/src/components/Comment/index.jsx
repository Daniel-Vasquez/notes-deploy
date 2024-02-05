import { useState } from 'react';
import { Form } from '../Form';
import './index.css';

export function Comment({ notes, note, deleteComment, updateComment }) {
  const { id, date, content } = note;
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
      {isEditing && (
        <>
          <h3 className="note-title">Edita tu comentario:</h3>
          <Form
            id={id}
            value={inputTextEdit}
            content={content}
            onCancel={handleCancelClick}
            onChange={handleChange}
            onSubmit={handleSaveClick}
          />
        </>
      )}

      {!isEditing && (
        <>
          <p className="note-content dark:text-white">
            {/* {content}, <strong>{date}</strong>. */}
            {content}
          </p>
          {/* <div className="comment-card-buttons">
            <button
              className="comment-card-buttons__comment"
              onClick={() => handleUpdateClick(id)}
            >
              Editar
            </button>
            <button
              className="comment-card-buttons__comment"
              onClick={deleteComment}
              style={{
                backgroundColor: 'red'
              }}
            >
              Eliminar
            </button>
          </div> */}
        </>
      )}
    </div >
  );
}
