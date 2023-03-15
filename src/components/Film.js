const Film = ({ film, handleCheck, handleDelete }) => {
  return (
    <div className='film'>
      <input
        type='checkbox'
        onChange={() => handleCheck(film.id)}
        checked={film.viewed}
      />
      <label
        style={film.viewed ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleCheck(film.id)}
      >
        {film.filmTitle}
      </label>
      <button onClick={() => handleDelete(film.id)}>Delete</button>
    </div>
  );
};

export default Film;
