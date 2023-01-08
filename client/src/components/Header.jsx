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
                            {/* {
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
                            </li> */}
                        </ul>
                    </div>
                    <Searcher />
                    {
                        user !== null ? (
                            <>
                                <div className="btn-group ms-4">
                                    <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user.name}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                        <li><Link className="dropdown-item" to="/purchases">Purchases</Link></li>
                                        <li><a className="dropdown-item" href="#">Reviews</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item" onClick={handleLogOut}>Log Out</button></li>
                                    </ul>
                                </div>
                            </>
                        ) : ''
                    }
                    {
                        localUser !== null ? (
                            <>
                                {/* <img className="rounded mx-auto d-block" src={localUser?.picture} alt="profile" /> */}
                                <div className="btn-group ms-4">
                                    <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        {localUser.result.name}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                        <li><Link className="dropdown-item" to="/purchases">Purchases</Link></li>
                                        <li><a className="dropdown-item" href="#">Reviews</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item" onClick={handleLogOut}>Log Out</button></li>
                                    </ul>
                                </div>
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