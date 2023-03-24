import Header from "./components/Header";
import Content from "./components/Content";
import AddFilm from "./components/AddFilm";
import Search from "./components/Search";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";
function App() {
  // const API_URL = "https://mustbebuilt.co.uk/SHU/films-api/api.php";
  // const API_URL = "https://dummyjson.com/productList";
  const API_URL =" http://localhost:3500/wishList"
  const [films, setFilms] = useState([]);
  const [newFilm, setNewFilm] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=>{
    const fetchFilms = async () =>{
      try{
        const response = await fetch(API_URL) ;
        console.dir(response);
        if(!response.ok) throw Error("API not found")
        const listFilms = await response.json();
        setFetchError(null)
        setFilms(listFilms)
            }catch(err){
              console.log(err.stack)
              setFetchError(err.message)
      }finally{
        setIsLoading(false)
      }
    }
    fetchFilms()
  }, [])

  const addFilm = async (film) => {
    const id = films.length ? films[films.length - 1].id + 1 : 1;
    const myNewFilm = { id, viewed: false, filmTitle: film };
    const listFilms = [...films, myNewFilm];
    setFilms(listFilms);
    const postOptions = {method: "POST", headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(myNewFilm)
    }
  const result = await apiRequest(API_URL, postOptions)
  if(result) setFetchError(result)
  };

  const handleCheck = async (id) => {
    console.info(id);
    const listFilms = films.map((film) =>
      film.id === id ? { ...film, viewed: !film.viewed } : film
    );
    setFilms(listFilms);
    const myFilm = listFilms.filter((film) => film.id === id)
    const updateOptions = {method: "PATCH", headers:{
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({viewed: myFilm[0].viewed})
    }
    const reqURL = `${API_URL}/${id}`
    const result = await apiRequest(reqURL, updateOptions)
    if(result) setFetchError(result)
    }
 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newFilm) return;
    addFilm(newFilm);
    setNewFilm("");
  };

  const handleDelete = async (id) => {
    const listFilms = films.filter((film) => film.id !== id);
    setFilms(listFilms);
    const deleteOptions = {method: "DELETE"}
    const reqURL = `${API_URL}/${id}`
    const result = await apiRequest(reqURL, deleteOptions)
    if(result) setFetchError(result)
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
      <div>
        {isLoading && <p>Loading ...</p>}
        {fetchError && <p>{fetchError}</p>}
        {!fetchError && 
      <Content
        // films={films}
        films={films.filter((film) =>
          film.filmTitle.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      >
        </Content>
        }
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
