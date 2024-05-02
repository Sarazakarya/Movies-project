
import { Container } from "react-bootstrap";
import NavBar from "./component/NavBar";
import MoviesList from "./component/MoviesList";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetails from "./component/MovieDetails";


function App() {
  const [movies, setMovies] = useState([]);
  const [pageCount, setpageCount] = useState(0);

  // get movies
  const getAllMovies = async () => {
    await axios.get(' https://api.themoviedb.org/3/movie/popular?api_key=21658c81f997bf378a9f606ab270f9a7').then((data) => {
      setMovies(data.data.results)
      setpageCount(data.data.total_pages)
    })
  }


  // search
  const getsearch = async (word) => {
    if (word === '') {
      getAllMovies()
    }
    else {
      await axios.get(`https://api.themoviedb.org/3/search/movie?query=${word}&api_key=21658c81f997bf378a9f606ab270f9a7`).then((data) => {
        setMovies(data.data.results)
        setpageCount(data.data.total_pages)
      })
    }
  }


  // Page
  const getPage = async (page) => {
    await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=21658c81f997bf378a9f606ab270f9a7&language=ar&page=${page}`).then((data) => {
      setMovies(data.data.results)
      setpageCount(data.data.total_pages)
    })
  }

  useEffect(() => {
    getAllMovies()
  }, [])
  return (
    <div className="font color-body ">
      <NavBar getsearch={getsearch} />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MoviesList movies={movies} getPage={getPage} pageCount={pageCount} />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>

  );
}

export default App;
