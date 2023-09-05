import { useState } from 'react';
import './index.css';

export function Comment({ comment, deleteComment, updateComment, newDateComment }) {
  const { title, content } = comment
  const [isEditing, setIsEditing] = useState(false);
  const [inputTextEdit, setInputTextEdit] = useState(title ? title : "")

  const [updatedDescription, setUpdatedDescription] = useState(title);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const dateComment = newDateComment()

    const updatedCommentEdit = {
      ...comment,
      description: inputTextEdit,
      date: dateComment
    };

    updateComment(updatedCommentEdit);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setUpdatedDescription(updatedDescription);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setInputTextEdit(e.target.value);
  }

  return (
    <div className="note">
      {isEditing ? (
        <>
          <h3>Edita tu comentario:</h3>
          <input
            className="input__field"
            value={inputTextEdit}
            placeholder='Escribe tu comentario'
            onChange={handleChange}
          />
          <div className="comment-card-buttons">
            <button
              className="comment-card-buttons__comment"
              onClick={handleSaveClick}
              disabled={!inputTextEdit}
            >
              Guardar
            </button>
            <button
              className="comment-card-buttons__comment"
              onClick={handleCancelClick}
              style={{
                backgroundColor: 'red'
              }}
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          <p>
            {title}, {" "}
            <strong>{content}.</strong>
          </p>
          <div className="comment-card-buttons">
            <button
              className="comment-card-buttons__comment"
              onClick={handleUpdateClick}
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
          </div>
        </>
      )}
    </div>
  );
}
