import { useState } from "react"
import { useEffect } from "react"
import { BiPurchaseTagAlt } from "react-icons/bi"
import { CgComment } from "react-icons/cg"
import { ImProfile } from "react-icons/im"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getProfileById, getUserById, patchUserRole, patchUserStatus } from "../../redux/actions/userActions"
import { clearUserDetails } from "../../redux/slices/userSlice"
import NavBar from "./NavBar";


export default function UserDetails() {

    const { _id } = useParams()
    const { user } = useSelector(state => state.user)
    const {profile} = useSelector(state => state.user)
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearUserDetails())
        dispatch(getUserById(_id))
        if(localUser) {
            dispatch(getProfileById(localUser.result._id))
        }
    }, [dispatch, _id])


    return (
        <div className="container py-4">
            <NavBar />
            <div className="bg-dark text-light p-4 rounded mb-4 d-flex align-items-center flex-wrap gap-4 justify-content-between" style={{ fontSize: '1.1rem' }}>
                <div className="d-flex align-items-center gap-4 flex-wrap">
                    {user?.picture && (
                        <img
                            src={user.picture}
                            alt={user.name}
                            className="rounded-circle"
                            style={{ width: '12dvh', height: '12dvh', objectFit: 'cover' }}
                          />
                    )}
                    <div>
                        <h2 className="mb-1">{user?.name}</h2>
                        <p className="mb-1 text-muted">{user?.email}</p>
                        <div className="d-flex gap-2">
                            <span className="badge bg-warning text-dark">{user?.owner ? 'Owner' : user?.admin ? 'Admin' : 'User'}</span>
                            <span className={`badge ${user?.banned ? 'bg-danger' : 'bg-success'}`}>
                                {user?.banned ? 'Banned' : 'Active'}
                            </span>
                        </div>
                    </div>
                </div>
                {profile?.owner && profile?._id !== user?._id && !user?.owner && (
                    <div className="d-flex flex-wrap gap-3">
                        <button
                            onClick={() => dispatch(patchUserRole(_id))}
                            className={`btn ${user?.admin ? 'btn-outline-danger' : 'btn-outline-success'} px-4 py-2`}
                        >
                            {user?.admin ? 'Downgrade' : 'Promote'}
                        </button>
                        <button
                            onClick={() => dispatch(patchUserStatus(_id))}
                            className={`btn ${user?.banned ? 'btn-secondary' : 'btn-danger'} px-4 py-2`}
                        >
                            {user?.banned ? 'Unban' : 'Ban'}
                        </button>
                    </div>
                )}
            </div>
            <div className="row gy-4">
                <div className="col-md-6">
                    <div className="bg-dark text-light p-4 rounded h-100" style={{ backgroundColor: '#1c1c1c' }}>
                        <h4 className="mb-3 border-bottom pb-2">Orders <span className="text-muted fs-6">({user?.orders?.length || 0})</span></h4>
                        {user?.orders?.length > 0 ? (
                            <div className="d-flex flex-column gap-3">
                                {user.orders.map((o, i) => (
                                    <div key={i} className="p-3 rounded" style={{ backgroundColor: '#1c1c1c', border: '1px solid #333' }}>
                                        <strong>{o?.purchased_Movie?.title}</strong>
                                        <p className="mb-1">Order ID: {o?._id}</p>
                                        <p className="mb-0">Spent: ${o?.purchased_Movie?.price?.toFixed()}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted">No orders found.</p>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="bg-dark text-light p-4 rounded h-100" style={{ backgroundColor: '#1c1c1c' }}>
                        <h4 className="mb-3 border-bottom pb-2">Comments <span className="text-muted fs-6">({user?.comments?.length || 0})</span></h4>
                        {user?.comments?.length > 0 ? (
                            <div className="d-flex flex-column gap-3">
                                {user.comments.map((c, i) => (
                                    <div key={i} className="p-3 rounded" style={{ backgroundColor: '#1c1c1c', border: '1px solid #333' }}>
                                        <strong>{c?.movieName}</strong>
                                        <p className="mb-0">{c?.text}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted">No comments found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}