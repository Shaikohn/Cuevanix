import { useReducer, useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getProfileById, patchUser } from "../../redux/actions/userActions"
import Modals from "../../components/Modals/Modals"
import { useModal } from "../../components/Modals/useModal";

export default function Profile() {

    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const {profile} = useSelector(state => state.user)
    const _id = localUser?.result?._id
    const dispatch = useDispatch()
    const [isOpenModal, openedModal, closeModal] = useModal(false);
    const [loading, setLoading] = useState(false)
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

    const initialState = { name: localUser.result.name, picture: localUser.result.picture }
    const [editData, setEditData] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(patchUser(_id, editData, setLoading, closeModal, forceUpdate))
    }

    const handleChange = (e) => {
        setEditData({ name: profile?.name, picture: profile?.picture, [e.target.name]: e.target.value})
    }
    
    useEffect(() => {
        dispatch(getProfileById(_id))
    }, [dispatch, _id, reducerValue])

    return (
        <div className="bg-dark text-light min-vh-100 py-5">
            <div className="container">
                <div className="d-flex flex-column flex-md-row align-items-center p-4 rounded shadow mb-5" style={{ backgroundColor: '#1e1e1e', gap: '2rem', border: '1px solid #333' }}>
                    <div className="text-center">
                        <img
                            src={profile?.picture}
                            alt={profile?.name}
                            className="rounded-circle border shadow profile-img"
                            style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                transition: 'box-shadow 0.7s ease'
                            }}
                        />
                    </div>
                    <div className="flex-grow-1">
                        <h2 className="mb-1 text-light">{profile?.name}</h2>
                        <span className={`badge rounded-pill px-3 py-2 fs-6 ${profile?.owner ? 'bg-warning text-dark' : profile?.admin ? 'bg-info text-dark' : 'bg-secondary'}`}>
                            {profile?.owner ? 'Owner' : profile?.admin ? 'Admin' : 'User'}
                        </span>
                        <p className="mt-3 text-muted">
                            In this section, you can view and edit your personal information, review your purchase orders, and see your published movie reviews.
                        </p>
                        <button className="btn btn-outline-light mt-2" onClick={openedModal}>
                            Edit Profile
                        </button>
                    </div>
                </div>
                <section className="mb-5 p-4 rounded" style={{ backgroundColor: '#1e1e1e' }}>
                    <h5 className="mb-3 border-bottom pb-2">📄 Personal Information</h5>
                    <p><strong>Email:</strong> <span className="text-muted">{profile?.email}</span></p>
                    <p><strong>Picture URL:</strong> <span className="text-muted">{profile?.picture || 'None'}</span></p>
                </section>
                <section className="mb-5">
                    <h5 className="mb-3">🛒 Your Orders</h5>
                    <div className="d-flex flex-wrap gap-4">
                        {profile?.orders?.length ? profile.orders.map((o, i) => (
                            <div key={i} className="p-3 text-light" style={{ backgroundColor: '#1e1e1e', borderRadius: '0.5rem', width: '18rem' }}>
                                <h5 className="mb-2">{o?.purchased_Movie?.title}</h5>
                                <p className="mb-1 text-muted"><strong>Order ID:</strong> {o?._id}</p>
                                <p className="mb-2 text-muted"><strong>Price:</strong> ${o?.purchased_Movie?.price?.toFixed()}</p>
                                <Link to={`/purchasedMovie/${o?.purchased_Movie?.id}`} className="btn btn-outline-light btn-sm w-100">
                                    View
                                </Link>
                            </div>
                        )) : <p className="text-muted">You have no orders.</p>}
                    </div>
                </section>
                <section>
                    <h5 className="mb-3">💬 Your Comments</h5>
                    <div className="d-flex flex-wrap gap-4">
                        {profile?.comments?.length ? profile.comments.map((o, i) => (
                            <div key={i} className="p-3 text-light" style={{ backgroundColor: '#1e1e1e', borderRadius: '0.5rem', width: '18rem' }}>
                                <h6 className="mb-1">{o?.movieName}</h6>
                                <p className="mb-0 text-muted">{o?.text}</p>
                            </div>
                        )) : <p className="text-muted">You haven’t commented on any movie yet.</p>}
                    </div>
                </section>
                <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
                    <h4>Edit Your Profile</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Name</label>
                            <input type="text" name="name" defaultValue={profile?.name} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label>Picture URL</label>
                            <input type="text" name="picture" defaultValue={profile?.picture} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-success" disabled={editData.name === initialState.name && editData.picture === initialState.picture}>
                                {loading ? <span className="spinner-border spinner-border-sm" /> : 'Save'}
                            </button>
                            <button type="button" className="btn btn-outline-danger" onClick={closeModal}>Cancel</button>
                        </div>
                    </form>
                </Modals>
            </div>
        </div>
    )
}