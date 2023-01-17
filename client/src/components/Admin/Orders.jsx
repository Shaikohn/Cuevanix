import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from "../../redux/actions/userActions";


export default function Orders() {

    const { orders } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch]);

    return (
        <div>
            { 
            orders
            .map((o, i) => {
                return (
                    <div className="card d-inline-flex ms-4 mb-3" style={{width: '19rem'}} key={i}>
                                        <div className="card-body">
                                            <h5 className="card-title">{o?.purchased_Movie?.title}</h5>
                                            <p className="card-text">Order ID: {o._id}</p>
                                            <p>User ID: {o.userId}  </p>
                                        </div>
                    </div>
                )
            }) }
        </div>
    )
}