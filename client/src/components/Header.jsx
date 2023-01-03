import {useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import decode from 'jwt-decode'
import Searcher from "./Searcher"
import Modals from './Modals/Modals'
import { useModal } from './Modals/useModal'
import Auth from './Auth/Auth'

export default function Header() {

    const favMovies = localStorage.getItem('favs')
    const favsArray = JSON.parse(favMovies)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('googleProfile')))
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const navigateTo = useNavigate()
    const location = useLocation()
    /* console.log('localUser', localUser)
    console.log('user', user) */

    const handleLogOut = () => {
        setUser(null)
        setLocalUser(null)
        localStorage.removeItem('googleProfile')
        localStorage.removeItem('profile')
        navigateTo('/catalog')
    }

    useEffect(() => {
        const token = localUser?.results?.token
        if(token) {
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogOut()
            }
        }
        setUser(JSON.parse(localStorage.getItem('googleProfile')))
        setLocalUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])


    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to='/'>Cuevanix</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to='/catalog'>Catalog</Link>
                            </li>
                            {
                                user !== null || localUser !== null ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/favourites'>Favourites</Link>
                                        </li>
                                    </>
                                ) : ''
                            }
                            {favsArray?.length > 0 ? 
                                <li className="nav-item  d-flex align-items-center">
                                    <span className="text-success">
                                        {favsArray?.length}
                                    </span>
                                </li> : ''
                            }
                            <li className="nav-item">
                                <Link className="nav-link" to='/contact'>Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <Searcher />
                    {
                        user !== null ? (
                            <>
                                <img className="rounded mx-auto d-block" src={user.picture} alt="profile" />
                                {user.name}
                                <button type="button" className="btn btn-danger" onClick={handleLogOut}>Sign Out</button>
                            </>
                        ) : ''
                    }
                    {
                        localUser !== null ? (
                            <>
                                {/* <img className="rounded mx-auto d-block" src={localUser?.picture} alt="profile" /> */}
                                {localUser.result.name}
                                <button type="button" className="btn btn-danger" onClick={handleLogOut}>Sign Out</button>
                            </>
                        ) : ''
                    }
                    {
                        user === null && localUser === null ? (
                            <>
                                <Auth />
                            </> 
                        ) : ''
                    }
                </div>
            </nav>
        </header>
    )
}