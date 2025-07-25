import { useState } from "react"
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { changePassword } from "../redux/actions/authActions"
import { useNavigate } from 'react-router-dom';


export default function PasswordChange(){
    
    const { _id } = useParams()
    const initialState = {password: '', repeatPassword: ''}
    const [newPassword, setNewPassword] = useState(initialState)
    const [showPassword, setShowPassword] =  useState(false);
    const [showRepeatPassword, setShowRepeatPassword] =  useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleShowPassword = () => setShowPassword(!showPassword)
    const handleShowRepeatPassword = () => setShowRepeatPassword(!showRepeatPassword)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(changePassword(_id, newPassword, navigate, e))
        setNewPassword(initialState)
    }

    const handleChange = (e) => {
        setNewPassword({ ...newPassword, [e.target.name]: e.target.value})
    }

    return (
        <div className="bg-dark text-light mt-5 d-flex justify-content-center align-items-center px-3">
            <div className="w-100" style={{ maxWidth: "500px" }}>
                <div className="text-center mb-4">
                    <h1 className="fw-bold">Reset Your Password</h1>
                    <p className="lead text-secondary">Choose a strong new password to protect your account</p>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="form-control"
                                placeholder="Enter new password"
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={handleShowPassword}
                                tabIndex={-1}
                            >
                                {showPassword ? <BsFillEyeSlashFill /> : <BsEyeFill />}
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Repeat Password</label>
                        <div className="input-group">
                            <input
                                type={showRepeatPassword ? "text" : "password"}
                                name="repeatPassword"
                                className="form-control"
                                placeholder="Repeat your password"
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={handleShowRepeatPassword}
                                tabIndex={-1}
                            >
                                {showRepeatPassword ? <BsFillEyeSlashFill /> : <BsEyeFill />}
                            </button>
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary fw-semibold">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}