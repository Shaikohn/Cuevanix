import { useState } from "react"
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { changePassword } from "../redux/actions/authActions"
import ChangePassword from "../assets/ChangePassword.png"


export default function PasswordChange(){
    
    const { _id } = useParams()
    const initialState = {password: '', repeatPassword: ''}
    const [loading, setLoading] = useState(false)
    const [newPassword, setNewPassword] = useState(initialState)
    const [showPassword, setShowPassword] =  useState(false);
    const [showRepeatPassword, setShowRepeatPassword] =  useState(false);
    const dispatch = useDispatch()

    const handleShowPassword = () => setShowPassword(!showPassword)
    const handleShowRepeatPassword = () => setShowRepeatPassword(!showRepeatPassword)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(changePassword(_id, newPassword, e))
        setNewPassword(initialState)
    }

    const handleChange = (e) => {
        setNewPassword({ ...newPassword, [e.target.name]: e.target.value})
    }

    return (
        <div className="d-flex ms-2">
            <div>
            <h1>Forgot your password?</h1>
            <h2>Change it here now!</h2>
            <form className="container" onSubmit={handleSubmit} noValidate>
            <div className="form-group col-md-4">
                <label>Password</label>
                <div className='d-flex'>
                    <input type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="Password" onChange={handleChange} />
                    <button type='button' style={{background:'none', border: 'none'}} onClick={handleShowPassword}>{showPassword ? <BsFillEyeSlashFill /> : <BsEyeFill />}</button>
                </div>
            </div>
            <div className="form-group col-md-4 mt-2">
                <label>Repeat password</label>
                <div className='d-flex'>
                    <input type={showRepeatPassword ? "text" : "password"} name="repeatPassword" className="form-control" placeholder="Password" onChange={handleChange} />
                    <button type='button' style={{background:'none', border: 'none'}} onClick={handleShowRepeatPassword}>{showRepeatPassword ? <BsFillEyeSlashFill /> : <BsEyeFill />}</button>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Send</button>
        </form>
        </div>
        <img style={{float: 'right'}} src={ChangePassword} alt="Password change" />
        </div>
    )
}