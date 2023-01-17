import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/actions/userActions";

export default function Users() {

    const dispatch = useDispatch()
    const { allUsers } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch]);

    return ( 
        <div>
            { 
            allUsers
            .map((u, i) => {
                return (
                    <ul className="table" key={i}>
                        <li><Link to={`/user/${u._id}`} /* className="btn btn-primary" */>{u.name}</Link></li>
                    </ul>
                )
            }) }
        </div>

    )
}