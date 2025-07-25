import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { verifyUser } from "../redux/actions/authActions";

export default function Verification() {

    const { _id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const verify = () =>  {
        dispatch(verifyUser(_id, navigate))
        
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-dark text-light">
            <div className="text-center p-4 rounded" style={{ maxWidth: '600px' }}>
                <h1 className="display-3 fw-bold text-primary mb-3">CUEVANIX</h1>
                <p className="fs-4 text-white-50 mb-5">Your favorite movies, anytime. Just one click away.</p>
                <p className="mb-4 fs-5">
                    Thank you for signing up. Please click the button below to verify your account and activate all features.
                </p>
                <button className="btn btn-success px-4 py-2 fs-5 fw-semibold" onClick={() => verify(_id)}>
                    Verify Account
                </button>
            </div>
        </div>
    )
}