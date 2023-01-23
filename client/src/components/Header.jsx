import { useEffect, useReducer, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import decode from 'jwt-decode'
import Searcher from "./Searcher"
import Auth from './Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileById } from "../redux/actions/userActions"
import { clearUser } from '../redux/slices/userSlice'
import {FaUserShield} from 'react-icons/fa'
import Inquirie from './Inquirie'

export default function Header() {

    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const navigateTo = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(clearUser())
        localStorage.removeItem('profile')
        navigateTo('/catalog')
    }

    useEffect(() => {
        const token = localUser?.token
        if(token) {
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogOut()
            }
        }
        if(localUser) {
            dispatch(getProfileById(localUser.result._id))
        }
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
                            <li>
                                <Inquirie />
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
                        localUser !== null ? (
                            <>
                                <div className="btn-group ms-4">
                                    <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        {localUser.result.name}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                        <li><Link className="dropdown-item" to="/purchases">Purchases</Link></li>
                                        <li><Link className="dropdown-item" to="/messages">Messages</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item" onClick={handleLogOut}>Log Out</button></li>
                                    </ul>
                                </div>
                            </>
                        ) : ''
                    }
                    {
                        localUser?.result?.owner === true || localUser?.result?.admin === true ? (
                            <div>
                            <button type='button' className="btn btn-light ms-3" data-bs-toggle="dropdown" aria-expanded="false">
                                <FaUserShield size={30} />
                            </button>
                            <ul style={{left: 'auto', top: '50px'}} className="dropdown-menu ms-3">
                                        <li><Link className="dropdown-item" to="/adminPanel">Admin Panel</Link></li>
                                    </ul>
                            </div>
                        ) : ''
                    }
                    {
                        localUser === null ? (
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