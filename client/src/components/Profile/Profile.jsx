import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getProfileById, patchUser } from "../../redux/actions/userActions"
import Modals from "../Modals/Modals"
import { useModal } from "../Modals/useModal";


export default function Profile() {

    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const {profile} = useSelector(state => state.user)
    const _id = localUser?.result?._id
    const dispatch = useDispatch()
    const [isOpenModal, openedModal, closeModal] = useModal(false);

    const initialState = { name: profile?.name, email: profile?.email, picture: profile?.picture }
    const [editData, setEditData] = useState(initialState)
    console.log(editData)

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(patchUser(editData, _id))
    }
    
    useEffect(() => {
        dispatch(getProfileById(_id))
    }, [dispatch, _id])

    return (
        <div className="ms-3">
                <div>
                    <h1> {profile?.name} </h1>
                    <h2> {profile?.email} </h2>
                    {profile?.picture !== undefined ? <img src={profile?.picture} alt={profile?.name} referrerPolicy="no-referrer" /> : ''}
                    <button className="btn btn-warning" onClick={() => openedModal()}>Edit</button>
                    <h3>Orders:</h3>
                </div>
                <div>
                    <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
        <h2> Edit your data! </h2>
        <form className="container" onSubmit={handleSubmit} noValidate>
                    <div className='d-flex text-center'>
                        <div className="form-group col-md-4 ms-5 ">
                            <label>Name</label>
                            <input defaultValue={profile?.name} autoComplete='off' type="text" name="name" className="form-control" placeholder="Name" onChange={handleChange}  />
                        </div>
                    
            <div className="form-group col-md-4 ms-5 text-center">
                <label>Email</label>
                <input defaultValue={profile?.email} autoComplete='off' type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} />
            </div>
            </div>
            <div className="mb-3">
  <label htmlFor="formFile" className="form-label">Your profile picture</label>
  <input defaultValue={profile?.picture} name="picture" className="form-control" type="file" id="formFile" />
</div>
            <div className='text-center mt-3'>
                <button type="submit" className="btn btn-primary">Send</button>
            </div>
        </form>
        <button type="button" className="btn btn-danger" onClick={closeModal}>Close</button>
        </Modals>
                </div>
            {
                            profile?.orders?.map((o, i) => {
                                return (
                                    <div className="card d-inline-flex ms-4 mb-3" style={{width: '19rem'}} key={i}>
                                        <div className="card-body">
                                            <h5 className="card-title">{o?.purchased_Movie?.title}</h5>
                                            <p className="card-text">Order ID: {o?._id}</p>
                                            <p className="card-text">Money spent: ${o?.purchased_Movie?.price}</p>
                                            <Link to={`/purchasedMovie/${o?.purchased_Movie?.id}`} className="btn btn-primary">View</Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
        </div>
    )
}