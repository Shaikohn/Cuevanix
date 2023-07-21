import NavBar from "./NavBar";
import Admin from '../../assets/Admin.png'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllInquiries } from "../../redux/actions/inquirieActions";
import { Link } from "react-router-dom";
import { getProfileById } from "../../redux/actions/userActions";

export default function AdminPanel() {

    const {profile} = useSelector(state => state.user)
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const { inquiries } = useSelector(state => state.inquirie)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllInquiries())
        if(localUser) {
            dispatch(getProfileById(localUser.result._id))
        }
    }, [dispatch])

    return (
        <div>
            <NavBar />
            <img className="adminPanelImage" src={Admin} alt='background' />
            <div className="viewInquiries">
                <h1>Welcome {profile?.name}! </h1>
                <div className="list-group">
                { 
            inquiries
            .map((inq, i) => {
                return (
                    <div key={i}>
                        <Link style={{width: 'fit-content', maxWidth: '300px', marginBottom: '10px'}} className="list-group-item list-group-item-action rounded" to={`inquiry/${inq._id}`}>{inq?.name} has sent an inquiry!</Link>
                    </div>
                )
            }) }
            </div>
            </div>
        </div>
    )
}