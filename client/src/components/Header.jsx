import { useEffect, useReducer, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import decode from 'jwt-decode'
import Searcher from "./Searcher"
import Auth from './Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../redux/slices/userSlice'
import {FaUserShield} from 'react-icons/fa'
import Inquiry from './Inquiry'

export default function Header() {

    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    const navigateTo = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(clearUser())
        localStorage.removeItem('profile')
        navigateTo('/catalog')
        forceUpdate()
    }

    useEffect(() => {
        const token = localUser?.token
        if(token) {
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogOut()
            }
        }
        setLocalUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <header className="shadow-sm">
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(90deg, #1f1f1f, #2d2d2d)' }}>
                <div className="container-fluid px-4">
                    <Link className="navbar-brand fw-bold fs-4 text-info" to='/'>Cuevanix</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-light hover-underline" to='/catalog'>Catalog</Link>
                            </li>
                            <li className="nav-item">
                                <Inquiry />
                            </li>
                        </ul>
                        <div className="d-flex flex-column flex-lg-row align-items-center gap-2 ms-lg-3 mt-lg-0 mt-2">
                            <Searcher />
                            {localUser !== null && (
                                <>
                                    <div className="btn-group ms-3">
                                        <button type="button" className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            {localUser.result.name}
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                            <li><Link className="dropdown-item" to="/purchases">Purchases</Link></li>
                                            <li><Link className="dropdown-item" to="/messages">Messages</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><button className="dropdown-item text-danger" onClick={handleLogOut}>Log Out</button></li>
                                        </ul>
                                    </div>
                                </>
                            )}
                            {localUser?.result?.owner || localUser?.result?.admin ? (
                                <div className="dropdown ms-3">
                                    <button type='button' className="btn btn-outline-warning" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FaUserShield size={22} />
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><Link className="dropdown-item text-warning" to="/adminPanel">Admin Panel</Link></li>
                                    </ul>
                                </div>
                            ) : null}
                            {localUser === null && (
                                <div className="ms-3">
                                    <Auth />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}