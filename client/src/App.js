import './App.css'
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Catalog from "./components/Catalog";
import Footer from "./components/Footer";
import Details from './components/Details';
import Results from "./components/Results";
import Favourites from './components/Favourites';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Purchases from './components/Profile/Purchases';
import Profile from './components/Profile/Profile';
import PurchasedMovie from './components/Profile/PurchasedMovie';
import AdminPanel from './components/Admin/AdminPanel';
import UserDetails from './components/Admin/UserDetails';
import Orders from './components/Admin/Orders';
import Users from './components/Admin/Users';
import Movies from './components/Admin/Movies';
import MovieDetails from './components/Admin/MovieDetails';
import InquiryDetails from './components/Admin/InquiryDetails';
import { useSelector } from 'react-redux';
import Messages from './components/Profile/Messages';
import Verification from './components/Verification';
import PasswordChange from './components/PasswordChange';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const {profile} = useSelector(state => state.user)
  const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const location = useLocation()

  useEffect(() => {
    setLocalUser(JSON.parse(localStorage.getItem('profile')))
    console.log(localUser)
  }, [location])

  return (
    <GoogleOAuthProvider clientId="569222121144-fap8qmrds81cqlvr1kcqdnbn58flam7b.apps.googleusercontent.com">
      <Header />
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/catalog' element={<Catalog />} />
        <Route exact path='/movie/:id' element={<Details />} />
        <Route exact path='/results' element={<Results />} />
        <Route exact path='/verification/:_id' element={<Verification />} />
        <Route exact path='/changePassword/:_id' element={<PasswordChange />} />
        <Route exact path='/favourites' element={localUser !== null ? <Favourites /> : <Navigate to="/" replace /> } />
        <Route exact path='/purchases' element={localUser !== null ? <Purchases /> : <Navigate to="/" replace /> } />
        <Route exact path='/profile' element={localUser !== null ? <Profile /> : <Navigate to="/" replace /> } />
        <Route exact path='/purchasedMovie/:id' element={localUser !== null ? <PurchasedMovie /> : <Navigate to="/" replace /> } />
        <Route exact path='/messages' element={<Messages />} />
        <Route exact path='/adminPanel' element={localUser?.result?.admin === true || localUser?.result?.owner === true ? <AdminPanel /> : <Navigate to="/" replace /> } />
        <Route exact path='/users' element={localUser?.result?.admin === true || localUser?.result?.owner === true ? <Users /> : <Navigate to="/" replace /> } />
        <Route exact path='/user/:_id' element={localUser?.result?.admin === true || localUser?.result?.owner === true ? <UserDetails /> : <Navigate to="/" replace /> } />
        <Route exact path='/orders' element={localUser?.result?.admin === true || localUser?.result?.owner === true ? <Orders /> : <Navigate to="/" replace /> } />
        <Route exact path='/movies' element={localUser?.result?.admin === true || localUser?.result?.owner === true ? <Movies /> : <Navigate to="/" replace /> } />
        <Route exact path='/movieDetails/:id' element={localUser?.result?.admin === true || localUser?.result?.owner === true ? <MovieDetails /> : <Navigate to="/" replace /> } />
        <Route exact path='/adminPanel/inquiry/:_id' element={localUser?.result?.admin === true || localUser?.result?.owner === true ? <InquiryDetails /> : <Navigate to="/" replace /> } />
      </Routes>
      <Footer />
    </ GoogleOAuthProvider>
  );
}

export default App;
