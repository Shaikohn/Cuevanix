import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getUserById } from "../../redux/actions/userActions"


export default function Purchases() {

    const {user} = useSelector(state => state.user)
    const {profile} = useSelector(state => state.user)
    console.log(profile)
    const _id = user?.result?._id
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getUserById(_id))
    }, [dispatch, _id])

    return (
        <div>
            <h1> {profile?.name} purchases: </h1>
            {
                            profile?.orders?.map((o, i) => {
                                return (
                                    <div className="card mb-3 ms-5 d-inline-flex align-items-center" style={{maxWidth: '400px'}} key={i}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={o?.purchased_Movie?.image} className="img-fluid rounded-start" style={{height: '100%'}} alt={o?.purchased_Movie?.title} />
                                            </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{o?.purchased_Movie?.title}</h5>
                                                <p className="card-text">Rating: {o?.purchased_Movie?.rating}</p>
                                                <p className="card-text">Release date: {o?.purchased_Movie?.release_date}</p>
                                                <Link to={`/purchasedMovie/${o?.purchased_Movie?.id}`} className="btn btn-primary">View</Link>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
        </div>
    )
}