import './App.css'
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Footer from "./components/Footer";
import Details from './pages/Details';
import Results from "./pages/Results";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Purchases from './pages/Profile/Purchases';
import Profile from './pages/Profile/Profile';
import PurchasedMovie from './pages/Profile/PurchasedMovie';
import AdminPanel from './pages/Admin/AdminPanel';
import UserDetails from './pages/Admin/UserDetails';
import Orders from './pages/Admin/Orders';
import Users from './pages/Admin/Users';
import Movies from './pages/Admin/Movies';
import MovieDetails from './pages/Admin/MovieDetails';
import InquiryDetails from './pages/Admin/InquiryDetails';
import Messages from './pages/Profile/Messages';
import Verification from './pages/Verification';
import PasswordChange from './pages/PasswordChange';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const location = useLocation()

  useEffect(() => {
    setLocalUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
      <GoogleOAuthProvider clientId="569222121144-fap8qmrds81cqlvr1kcqdnbn58flam7b.apps.googleusercontent.com">
          <div className="d-flex flex-column min-vh-100 bg-dark text-light">
              <Header />
              <main className="flex-fill">
                  <Routes>
                      <Route exact path='/' element={<LandingPage />} />
                      <Route exact path='/catalog' element={<Catalog />} />
                      <Route exact path='/movie/:id' element={<Details />} />
                      <Route exact path='/results' element={<Results />} />
                      <Route exact path='/verification/:_id' element={<Verification />} />
                      <Route exact path='/changePassword/:_id' element={<PasswordChange />} />
                      <Route exact path='/purchases' element={localUser !== null ? <Purchases /> : <Navigate to="/" replace />} />
                      <Route exact path='/profile' element={localUser !== null ? <Profile /> : <Navigate to="/" replace />} />
                      <Route exact path='/purchasedMovie/:id' element={localUser !== null ? <PurchasedMovie /> : <Navigate to="/" replace />} />
                      <Route exact path='/messages' element={<Messages />} />
                      <Route exact path='/adminPanel' element={localUser?.result?.admin === true || localUser?.result?.owner === true ? <AdminPanel /> : <Navigate to="/" replace />} />
                      <Route exact path='/users' element={localUser?.result?.admin === true || localUser?.result?.owner === true ? <Users /> : <Navigate to="/" replace />} />
                      <Route exact path='/user/:_id' element={localUser?.result?.admin === true || localUser?.result?.owner === true ? <UserDetails /> : <Navigate to="/" replace />} />
                      <Route exact path='/orders' element={localUser?.result?.admin === true || localUser?.result?.owner === true ? <Orders /> : <Navigate to="/" replace />} />
                      <Route exact path='/movies' element={localUser?.result?.admin === true || localUser?.result?.owner === true ? <Movies /> : <Navigate to="/" replace />} />
                      <Route exact path='/movieDetails/:id' element={localUser?.result?.admin === true || localUser?.result?.owner === true ? <MovieDetails /> : <Navigate to="/" replace />} />
                      <Route exact path='/adminPanel/inquiry/:_id' element={localUser?.result?.admin === true || localUser?.result?.owner === true ? <InquiryDetails /> : <Navigate to="/" replace />} />
                  </Routes>
              </main>
              <Footer />
          </div>
    </GoogleOAuthProvider>
  );
}

export default App;
