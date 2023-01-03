import { useState } from 'react'
import { BsEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../redux/actions/authActions';
import Modals from '../Modals/Modals';
import { useModal } from '../Modals/useModal';

export default function Auth() {

    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

    const [showPassword, setShowPassword] =  useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const [isOpenModal, openedModal, closeModal] = useModal(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignUp) {
            dispatch(signUp(formData, navigateTo))
        } else {
            dispatch(signIn(formData, navigateTo))
        }
        console.log(formData)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => setShowPassword(!showPassword)

    const switchMode = () => setIsSignUp(!isSignUp)

    const googleSuccess = async(res) => {
        const token = res.credential
        const userObject = (jwt_decode(token))
        try {
            localStorage.setItem('googleProfile', JSON.stringify(userObject))
            console.log(userObject)
            navigateTo('/catalog')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
        <button type="button" className="btn btn-lg btn-primary ms-4" onClick={openedModal}>Sign In</button>
        <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
        <h2> {isSignUp ? 'Sign Up' : 'Sign In'} </h2>
        <form className="container" onSubmit={handleSubmit}>
            {
                isSignUp && (
                    <div className='d-flex text-center'>
                        <div className="form-group col-md-4 ms-5 ">
                            <label>Name</label>
                            <input type="text" name="firstName" className="form-control" placeholder="Name" onChange={handleChange}  />
                        </div>
                        <div className="form-group col-md-4 ms-4">
                            <label>Lastname</label>
                            <input type="text" name="lastName" className="form-control" placeholder="Lastname" onChange={handleChange}  />
                        </div>
                    </div>
                )
            }
            <div className='d-flex mt-1 mx-auto text-center'>
            <div className="form-group col-md-4 ms-5 text-center">
                <label>Email</label>
                <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} />
            </div>
            <div className="form-group col-md-4 ms-4 text-center">
                <label>Password</label>
                <div className='d-flex'>
                    <input type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="Password" onChange={handleChange} />
                    <button type='button' style={{background:'none', border: 'none'}} onClick={handleShowPassword}>{showPassword ? <BsFillEyeSlashFill /> : <BsEyeFill />}</button>
                </div>
            </div>
            </div>
            {
                isSignUp && (
                    <>
                        <div className="form-group col-md-4 mx-auto text-center mt-2">
                            <label>Repeat password</label>
                            <div className='d-flex'>
                                <input type="password" name="confirmPassword" className="form-control" placeholder="Password" onChange={handleChange} />
                            </div>
                        </div>
                    </>
                )
            }
            <div className='text-center mt-3'>
                <button type="submit" className="btn btn-primary">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
            </div>
        </form>
        <GoogleLogin
            client_id="569222121144-fap8qmrds81cqlvr1kcqdnbn58flam7b.apps.googleusercontent.com"
            onSuccess={googleSuccess}
            onError={() => {
                console.log('Login Failed');
            }}
        />
        <div className='d-flex'>
        <button className='btn btn-warning' onClick={switchMode}> { isSignUp ? 'Already signed up? Sign In' : "Don't have an account? Sign Up" } </button>
        <button type="button" className="btn btn-danger ms-5" onClick={closeModal}>Close</button>
        </div>
        </Modals>
        </div>
    )
}