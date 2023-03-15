import { useRef } from "react";

const AddFilm = ({ newFilm, setNewFilm, handleSubmit }) => {
  const inputRef = useRef();

  return (
    <form className='addForm' onSubmit={handleSubmit}>
      <label htmlFor='AddFilm'>Add Film</label>
      <input
        autoFocus
        ref={inputRef}
        id='AddFilm'
        type='text'
        placeholder='Add Film'
        required
        value={newFilm}
        onChange={(e) => setNewFilm(e.target.value)}
      />
      <button
        type='submit'
        aria-label='Add Film'
        onClick={() => inputRef.current.focus()}
      >
        Add Film
      </button>
    </form>
  );
};

export default AddFilm;
