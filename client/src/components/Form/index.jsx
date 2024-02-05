import "./index.css"

export const Form = ({ id, value, content, onCancel, onChange, onSubmit }) => {
  return (
    <form className="comment-card-inputs" onSubmit={onSubmit}>
      <label className="comment-card-input font-semibold text-lg dark:bg-transparent dark:text-white">
        <input
          className="input__field"
          type="text"
          placeholder=" "
          value={value}
          onChange={onChange}
        />
        <span className="comment-card-input__label dark:bg-slate-700 dark:text-white">Escribe tu comentario aquí</span>
      </label>
      <div className="comment-card-buttons">
        {id && (
          <>
            <button
              type='submit'
              className="comment-card-buttons__comment"
              disabled={value === content || value === ""}
            >
              Guardar
            </button>
            <button
              type='button'
              className="comment-card-buttons__comment"
              onClick={onCancel}
              style={{
                backgroundColor: 'red'
              }}
            >
              Cancelar
            </button>
          </>
        )}
        {!id && (
          <button
            type='submit'
            disabled={!value}
            className="comment-card-buttons__comment bg-white text-black border border-black dark:bg-black dark:text-white"
          >
            Publicar
          </button>
        )}
      </div>
      <span className="warning-message dark:text-white">*No podrás editar el comentario una vez creado*</span>
    </form>
  )
}
