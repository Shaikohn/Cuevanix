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
                                    <li key={i}>
                                        {o?.purchased_Movie?.title}
                                        <Link to={`/purchasedMovie/${o?.purchased_Movie?.id}`} className="btn btn-primary">View</Link>
                                    </li>
                                )
                            })
                        }
        </div>
    )
}