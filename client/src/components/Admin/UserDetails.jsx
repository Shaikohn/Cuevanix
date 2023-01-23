import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getUserById, patchUserRole, patchUserStatus } from "../../redux/actions/userActions"
import { clearUserDetails } from "../../redux/slices/userSlice"
import NavBar from "./NavBar";


export default function UserDetails() {

    const { _id } = useParams()
    const { user } = useSelector(state => state.user)
    const {profile} = useSelector(state => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearUserDetails())
        dispatch(getUserById(_id))
    }, [dispatch, _id])


    return (
        <div className="ms-3">
            <NavBar />
            <div className="d-flex">
                <h1> {user?.name} </h1> 
                <p className="ms-3" style={{marginTop: '20px'}}>({user?._id})</p>
            </div>
            <h2> {user?.email} </h2>
            <img src={user?.picture} alt={user?.name} referrerPolicy="no-referrer" />
            <div>
                <div className='d-flex mt-3'>
                    <h3> Role: {user?.owner === true ? 'Owner' : user?.admin === true ? 'Admin' : 'User'} </h3> 
                    {profile?.owner === true && profile?._id !== _id && user?.banned === false && user?.admin === false ? <button onClick={() => dispatch(patchUserRole(_id))} type="button" className="btn btn-success ms-3">Promote to Admin</button> :''}
                    {profile?.owner === true && profile?._id !== _id && user?.banned === false && user?.admin === true ? <button onClick={() => dispatch(patchUserRole(_id))} type="button" className="btn btn-danger ms-3">Downgrade to User</button> :''}
                </div>
                <div className='d-flex mt-3'>
                    <h3> Status: {user?.banned === true ? 'Banned account' : 'Active account'} </h3> 
                    {user?.owner === false && profile?._id !== user?._id && user?.banned === false ? <button onClick={() => dispatch(patchUserStatus(_id))} type="button" className="btn btn-danger ms-3">Ban</button> :''}
                    {user?.owner === false && profile?._id !== user?._id && user?.banned === true ? <button onClick={() => dispatch(patchUserStatus(_id))} type="button" className="btn btn-secondary ms-3">Unban</button> :''}
                </div>
            </div>
            <h3>Orders:</h3>
            {user?.orders?.length > 0 ?
                            (user.orders.map((o, i) => {
                                return (
                                    <div className="card d-inline-flex ms-4 mb-3" style={{width: '19rem'}} key={i}>
                                        <div className="card-body">
                                            <h5 className="card-title">{o?.purchased_Movie?.title}</h5>
                                            <p className="card-text">Order ID: {o?._id}</p>
                                            <p> Money spent: ${o.purchased_Movie?.price?.toFixed()} </p>
                                        </div>
                                    </div>
                                )
                            })) : 'None'
                        }
        </div>
    )
}