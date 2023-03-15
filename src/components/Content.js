import FilmList from "./FilmList";

const Content = ({ films, handleCheck, handleDelete }) => {
  return (
    <main>
      {films.length ? (
        <FilmList
          films={films}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p>No Films Selected.</p>
      )}
    </main>
  );
};

export default Content;
