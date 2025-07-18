import { useEffect, useState } from 'react'
import { BsEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { signGoogle, signIn, signUp, emailPassword } from '../../redux/actions/authActions';
import Modals from '../Modals/Modals';
import { useModal } from '../Modals/useModal';
import '../Modals/Modals.css';
import userIcon from '../../assets/userIcon.png'
import { useReducer } from 'react';

export default function Auth() {

    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', picture: userIcon }

    const [showPassword, setShowPassword] =  useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpenModal, openedModal, closeModal] = useModal(false);
    const [loading, setLoading] = useState(false)
    const [forgotPassword, setForgotPassword] = useState(false)
    const initialEmail = {email: ''}
    const [sendEmail, setSendEmail] = useState(initialEmail)
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        
    }, [reducerValue]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignUp) {
            dispatch(signUp(formData, closeModal, setLoading, e, setFormData, initialState))
        } else {
            dispatch(signIn(formData, navigate, closeModal, setLoading, forceUpdate, setFormData, initialState))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => setShowPassword(!showPassword)

    const switchForgot = () => setForgotPassword(!forgotPassword)

    const switchMode = () => setIsSignUp(!isSignUp)

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        dispatch(emailPassword(sendEmail))
    }

    const handlePasswordChange = (e) => {
        setSendEmail({ ...sendEmail, [e.target.name]: e.target.value})
    }

    const googleSuccess = async(res) => {
        const token = res.credential
        const googleUser = (jwt_decode(token))
        try {
            dispatch(signGoogle(googleUser, navigate, closeModal, setLoading, forceUpdate))
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <button
                type="button"
                className="btn btn-outline-info ms-3 px-4 py-2 rounded-pill fw-semibold"
                onClick={openedModal}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Log in to access your account"
            >
                Sign In
            </button>
            <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
                <div className="bg-dark text-white p-4 rounded">
                    <h2 className="text-center mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="row justify-content-center">
                            {isSignUp && (
                                <>
                                    <div className="col-md-5 mb-3">
                                        <label>Name</label>
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            name="firstName"
                                            className="form-control"
                                            placeholder="Name"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-5 mb-3">
                                        <label>Lastname</label>
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            name="lastName"
                                            className="form-control"
                                            placeholder="Lastname"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                            <div className="col-md-10 mb-3">
                                <label>Email</label>
                                <input
                                    autoComplete="off"
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-10 mb-3">
                                <label>Password</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={handleChange}
                                    />
                                    <span className="input-group-text bg-secondary border-0 text-white" style={{ cursor: "pointer" }} onClick={handleShowPassword}>
                                        {showPassword ? <BsFillEyeSlashFill /> : <BsEyeFill />}
                                    </span>
                                </div>
                            </div>
                            {isSignUp && (
                                <div className="col-md-10 mb-3">
                                    <label>Repeat Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="Repeat Password"
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                        {loading ? (
                            <div className="text-center my-3">
                                <div className="spinner-border text-light" role="status"></div>
                            </div>
                        ) : (
                            <div className="text-center mt-4">
                                <button type="submit" className="btn btn-primary px-5">
                                    {isSignUp ? 'Sign Up' : 'Sign In'}
                                </button>
                            </div>
                        )}
                    </form>
                    {!loading && (
                        <div className="d-flex justify-content-center mt-3">
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <GoogleLogin
                                    client_id="569222121144-fap8qmrds81cqlvr1kcqdnbn58flam7b.apps.googleusercontent.com"
                                    onSuccess={googleSuccess}
                                    onError={() => console.log('Login Failed')}
                                />
                            </div>
                        </div>
                    )}
                    {!isSignUp && !loading && (
                        <div className="text-center mt-3">
                            <button className="btn btn-link text-info" onClick={switchForgot}>
                                Forgot password?
                            </button>
                        </div>
                    )}
                    {forgotPassword && !isSignUp && (
                        <form className="row justify-content-center mt-4" onSubmit={handlePasswordSubmit} noValidate>
                            <div className="col-md-7 mb-2">
                                <label>Email</label>
                                <input
                                    autoComplete="off"
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="col-md-3 d-flex align-items-end">
                                <button type="submit" className="btn btn-primary w-100">Send</button>
                            </div>
                        </form>
                    )}
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <button className="btn btn-warning" onClick={switchMode}>
                            {isSignUp ? 'Already signed up? Sign In' : "Don't have an account? Sign Up"}
                        </button>
                        <button type="button" className="btn btn-danger" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            </Modals>
        </div>
    )
}