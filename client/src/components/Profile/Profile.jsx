import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserById } from "../../redux/actions/userActions"


export default function Profile() {

    const {user} = useSelector(state => state.user)
    console.log(user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getUserById(user.result._id))
    }, [dispatch, user.result._id])

    return (
        <div>
            <h1> {user.result.name} </h1>
            <h2> {user.result.email} </h2>
            <h3>Orders:</h3>
            {
                            user?.result?.orders?.map((o, i) => {
                                return (
                                    <div key={i}>
                                        <h4>{o?.purchased_Movie?.title}</h4>
                                        <p>{o._id}</p>
                                    </div>
                                )
                            })
                        }
        </div>
    )
}