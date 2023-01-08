import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getUserById } from "../../redux/actions/userActions"


export default function Purchases() {

    const {user} = useSelector(state => state.user)
    console.log(user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getUserById(user.result._id))
    }, [dispatch, user.result._id])

    return (
        <div>
            <h1> {user.result.name} purchases: </h1>
            {
                            user?.result?.orders?.map((o, i) => {
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