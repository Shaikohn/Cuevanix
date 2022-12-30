import './App.css'
import { Route, Routes } from "react-router-dom";
import Catalog from "./components/Catalog";
import Footer from "./components/Footer";
import Details from './components/Details';
import Results from "./components/Results";
import Swal from 'sweetalert2';
import Favourites from './components/Favourites';
import { useState } from 'react';
import { useEffect } from 'react';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

function App() {

  const [favs, setFavs] = useState([])
    const favMovies = localStorage.getItem('favs')

    useEffect(() => {
        if(favMovies !== null) {
            const favsArray = JSON.parse(favMovies)
            setFavs(favsArray)
        } 
    }, [favMovies])

  const addOrRemoveFromFavs = (e) => {

    const favMovies = localStorage.getItem('favs')

    let tempMoviesInFavs

    if(favMovies === null) {
      tempMoviesInFavs= []
    } else {
      tempMoviesInFavs = JSON.parse(favMovies)
    }

    const btn = e.currentTarget
    const parent = btn.parentElement
    const imgURL = parent.querySelector('img').getAttribute('src')
    const title = parent.querySelector('h5').innerText
    const overview = parent.querySelector('p').innerText
    const movieData = {
      imgURL, title, overview,
      id: btn.dataset.movieId
    }
    let movieIsInArray = tempMoviesInFavs.find(m => {
      return m.id === movieData.id
    })
    if(!movieIsInArray) {
      tempMoviesInFavs.push(movieData)
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs))
      setFavs(tempMoviesInFavs)
      Swal.fire({
        title: 'NEW FAVOURITE ADDED',
        text: 'Film added correctly!',
        icon: 'success',
        timer: 3000,
    });
    } else {
      let moviesLeft = tempMoviesInFavs.filter(m => {
        return m.id !== movieData.id
      })
      localStorage.setItem('favs', JSON.stringify(moviesLeft))
      setFavs(moviesLeft)
      Swal.fire({
        title: 'FAVOURITE DELETED',
        text: 'Film deleted correctly!',
        icon: 'success',
        timer: 3000,
    });
    }
  }

  return (
    <GoogleOAuthProvider clientId="569222121144-fap8qmrds81cqlvr1kcqdnbn58flam7b.apps.googleusercontent.com">
      <Header />
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/signup' element={<Auth />} />
        <Route exact path='/catalog' element={<Catalog addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
        <Route exact path='/movie/:id' element={<Details addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
        <Route exact path='/results' element={<Results addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
        <Route exact path='/favourites' element={<Favourites favs={favs} addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
      </Routes>
      <Footer />
    </ GoogleOAuthProvider>
  );
}

export default App;
