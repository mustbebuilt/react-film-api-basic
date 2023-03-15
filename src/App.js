import Header from "./components/Header";
import Content from "./components/Content";
import AddFilm from "./components/AddFilm";
import Search from "./components/Search";
import Footer from "./components/Footer";
import { useState } from "react";
function App() {
  const [films, setFilms] = useState(
    JSON.parse(localStorage.getItem("watchList"))
    // [
    //   { id: 1, filmTitle: "Star Wars", viewed: false },
    //   { id: 2, filmTitle: "Jaws", viewed: true },
    // ]
  );
  const [newFilm, setNewFilm] = useState("");
  const [search, setSearch] = useState("");

  const addFilm = (film) => {
    const id = films.length ? films[films.length - 1].id + 1 : 1;
    const myNewFilm = { id, viewed: false, filmTitle: film };
    const listFilms = [...films, myNewFilm];
    setAndSaveItems(listFilms);
  };

  const setAndSaveItems = (newFilms) => {
    setFilms(newFilms);
    localStorage.setItem("watchList", JSON.stringify(newFilms));
  };
  const handleCheck = (id) => {
    console.info(id);
    const listFilms = films.map((film) =>
      film.id === id ? { ...film, viewed: !film.viewed } : film
    );
    setAndSaveItems(listFilms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newFilm) return;
    addFilm(newFilm);
    setNewFilm("");
  };

  const handleDelete = (id) => {
    const listFilms = films.filter((film) => film.id !== id);
    setAndSaveItems(listFilms);
  };
  return (
    <div>
      <Header></Header>
      <AddFilm
        newFilm={newFilm}
        setNewFilm={setNewFilm}
        handleSubmit={handleSubmit}
      />
      <Search search={search} setSearch={setSearch} />
      <Content
        // films={films}
        films={films.filter((film) =>
          film.filmTitle.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      ></Content>
      <Footer></Footer>
    </div>
  );
}

export default App;
