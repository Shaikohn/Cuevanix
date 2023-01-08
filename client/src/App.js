import './App.css'
import { Route, Routes } from "react-router-dom";
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

function App() {

  return (
    <GoogleOAuthProvider clientId="569222121144-fap8qmrds81cqlvr1kcqdnbn58flam7b.apps.googleusercontent.com">
      <Header />
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/catalog' element={<Catalog />} />
        <Route exact path='/movie/:id' element={<Details />} />
        <Route exact path='/results' element={<Results />} />
        <Route exact path='/favourites' element={<Favourites />} />
        <Route exact path='/purchases' element={<Purchases />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/purchasedMovie/:id' element={<PurchasedMovie />} />
      </Routes>
      <Footer />
    </ GoogleOAuthProvider>
  );
}

export default App;
