import { useState } from 'react'
import { BsEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

export default function Auth() {

    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

    const [showPassword, setShowPassword] =  useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigateTo = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignUp) {

        } else {
            
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
        <h2> {isSignUp ? 'Sign Up' : 'Sign In'} </h2>
        <form className="container" onSubmit={handleSubmit}>
            {
                isSignUp && (
                    <>
                        <div className="form-group col-md-4">
                            <label>Name</label>
                            <input type="text" name="firstName" className="form-control" placeholder="Name" onChange={handleChange}  />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Lastname</label>
                            <input type="text" name="lastName" className="form-control" placeholder="Lastname" onChange={handleChange}  />
                        </div>
                    </>
                )
            }
            <div className="form-group col-md-4">
                <label>Email</label>
                <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} />
            </div>
            <div className="form-group col-md-4">
                <label>Password</label>
                <div className='d-flex'>
                    <input type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="Password" onChange={handleChange} />
                    <button type='button' style={{background:'none', border: 'none'}} onClick={handleShowPassword}>{showPassword ? <BsFillEyeSlashFill /> : <BsEyeFill />}</button>
                </div>
            </div>
            {
                isSignUp && (
                    <>
                        <div className="form-group col-md-4">
                            <label>Repeat password</label>
                            <div className='d-flex'>
                                <input type={showPassword ? "text" : "password"} name="confirmPassword" className="form-control" placeholder="Password" onChange={handleChange} />
                                <button type='button' style={{background:'none', border: 'none'}} onClick={handleShowPassword}>{showPassword ? <BsFillEyeSlashFill /> : <BsEyeFill />}</button>
                            </div>
                        </div>
                    </>
                )
            }
            <button type="submit" className="btn btn-primary">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <button onClick={switchMode}> { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" } </button>
        <GoogleLogin
            client_id="569222121144-fap8qmrds81cqlvr1kcqdnbn58flam7b.apps.googleusercontent.com"
            onSuccess={googleSuccess}
            onError={() => {
                console.log('Login Failed');
            }}
        />
        </div>
    )
}