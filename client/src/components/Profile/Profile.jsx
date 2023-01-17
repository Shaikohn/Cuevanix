import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getProfileById } from "../../redux/actions/userActions"


export default function Profile() {
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const {profile} = useSelector(state => state.user)
    const _id = localUser?.result?._id
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getProfileById(_id))
    }, [dispatch, _id])

    return (
        <div>
            <h1> {profile.name} </h1>
            <h2> {profile.email} </h2>
            <img src={profile?.picture} alt={profile.name} referrerPolicy="no-referrer" />
            <h3>Orders:</h3>
            {
                            profile?.orders?.map((o, i) => {
                                return (
                                    <div className="card d-inline-flex ms-4 mb-3" style={{width: '19rem'}} key={i}>
                                        <div className="card-body">
                                            <h5 className="card-title">{o?.purchased_Movie?.title}</h5>
                                            <p className="card-text">Order ID: {o._id}</p>
                                            <Link to={`/purchasedMovie/${o?.purchased_Movie?.id}`} className="btn btn-primary">View</Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
        </div>
    )
}