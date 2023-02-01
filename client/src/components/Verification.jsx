import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { verifyUser } from "../redux/actions/authActions";
import Verified from '../assets/Verified.png'
import KeepCalm from '../assets/KeepCalm.jpg'

export default function Verification() {

    const { _id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const verify = () =>  {
        dispatch(verifyUser(_id))
        navigate("/catalog")
    }

    return (
        <div className="d-flex">
            <img style={{height: '500px'}} src={KeepCalm} alt="verified" />
            <div className="ms-5">
            <h1 >Click on the button to verify your account!</h1>
            <button className="btn btn-success" onClick={() => verify(_id)}>Verify Account</button> 
            <img src={Verified} alt="verified" />
            </div>
        </div>
    )
}