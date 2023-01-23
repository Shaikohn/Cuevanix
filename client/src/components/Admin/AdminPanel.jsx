import NavBar from "./NavBar";
import Admin from '../../assets/Admin.png'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllInquiries } from "../../redux/actions/inquirieActions";
import { Link } from "react-router-dom";

export default function AdminPanel() {

    const {profile} = useSelector(state => state.user)
    const { inquiries } = useSelector(state => state.inquirie)
    console.log(inquiries)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllInquiries())
    }, [dispatch])

    return (
        <div>
            <NavBar />
            <img style={{width: '600px', marginLeft: '50px', marginBottom: '50px', marginTop: '50px'}} src={Admin} alt='background' />
            <div style={{float: 'right', marginRight: '50px'}}>
                <h1>Welcome {profile?.name}! </h1>
                { 
            inquiries
            .map((inq, i) => {
                return (
                    <ul className="table" key={i}>
                        <Link to={`inquirie/${inq._id}`}>{inq?.name} has sent an inquiry!</Link>
                    </ul>
                )
            }) }
            </div>
        </div>
    )
}