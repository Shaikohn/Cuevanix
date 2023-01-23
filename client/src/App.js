import './App.css'
import { Route, Routes, Navigate } from "react-router-dom";
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
import InquirieDetails from './components/Admin/InquirieDetails';
import { useSelector } from 'react-redux';
import Messages from './components/Profile/Messages';

function App() {

  const {profile} = useSelector(state => state.user)

  return (
    <GoogleOAuthProvider clientId="569222121144-fap8qmrds81cqlvr1kcqdnbn58flam7b.apps.googleusercontent.com">
      <Header />
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/catalog' element={<Catalog />} />
        <Route exact path='/movie/:id' element={<Details />} />
        <Route exact path='/results' element={<Results />} />
        <Route exact path='/favourites' element={/* profile !== null ?  */<Favourites /> /* : <Navigate to="/" replace /> */} />
        <Route exact path='/purchases' element={/* profile !== null ?  */<Purchases /> /* : <Navigate to="/" replace /> */} />
        <Route exact path='/profile' element={/* profile !== null ?  */<Profile /> /* : <Navigate to="/" replace /> */} />
        <Route exact path='/purchasedMovie/:id' element={/* profile !== null ?  */<PurchasedMovie /> /* : <Navigate to="/" replace /> */} />
        <Route exact path='/messages' element={<Messages />} />
        <Route exact path='/adminPanel' element={/* profile?.admin === true || profile?.owner === true ? */ <AdminPanel /> /* : <Navigate to="/" replace /> */} />
        <Route exact path='/users' element={/* profile?.admin === true || profile?.owner === true ? */ <Users /> /* : <Navigate to="/" replace /> */} />
        <Route exact path='/user/:_id' element={/* profile?.admin === true || profile?.owner === true ? */ <UserDetails /> /* : <Navigate to="/" replace /> */} />
        <Route exact path='/orders' element={/* profile?.admin === true || profile?.owner === true ? */ <Orders /> /* : <Navigate to="/" replace /> */} />
        <Route exact path='/movies' element={/* profile?.admin === true || profile?.owner === true ? */ <Movies /> /* : <Navigate to="/" replace /> */} />
        <Route exact path='/movieDetails/:id' element={/* profile?.admin === true || profile?.owner === true ? */ <MovieDetails /> /* : <Navigate to="/" replace /> */} />
        <Route exact path='/adminPanel/inquirie/:_id' element={/* profile?.admin === true || profile?.owner === true ? */ <InquirieDetails /> /* : <Navigate to="/" replace /> */} />
      </Routes>
      <Footer />
    </ GoogleOAuthProvider>
  );
}

export default App;
