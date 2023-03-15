import Film from "./Film";

const FilmList = ({ films, handleCheck, handleDelete }) => {
  return (
    <div>
      {films.map((film) => (
        <Film
          key={film.id}
          film={film}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default FilmList;
