import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getProfileById, patchUser } from "../../redux/actions/userActions"
import Modals from "../Modals/Modals"
import { useModal } from "../Modals/useModal";
import { CgComment } from "react-icons/cg"
import { ImProfile } from 'react-icons/im'
import { BiPurchaseTagAlt } from 'react-icons/bi'


export default function Profile() {

    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const {profile} = useSelector(state => state.user)
    const _id = localUser?.result?._id
    const dispatch = useDispatch()
    const [isOpenModal, openedModal, closeModal] = useModal(false);
    const [loading, setLoading] = useState(false)

    const initialState = { name: profile?.name, picture: profile?.picture }
    const [editData, setEditData] = useState(initialState)

    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(patchUser(_id, editData, setLoading))
  }

    const handleChange = (e) => {
        setEditData({ name: profile?.name, picture: profile?.picture, [e.target.name]: e.target.value})
    }
    
    useEffect(() => {
        dispatch(getProfileById(_id))
    }, [dispatch, _id])

    return (
        <div className="ms-3">
                <div className="d-flex mb-3 mt-3 justify-content-center">
                    {profile?.picture !== undefined ? <img style={{borderRadius: '50px', width: '100px'}} src={profile?.picture} alt={profile?.name} referrerPolicy="no-referrer" /> : ''}
                    <div className="ms-2">
                      <h1> Welcome {profile?.name}! </h1>
                      {profile?.owner === true ? <h3 className="text-warning">Owner</h3> : profile?.admin === true ? <h3 className="text-warning">Admin</h3> : <h3>User</h3>}
                    </div>
                </div>
                    <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
        <h2> Edit your data! </h2>
        <form className="container" onSubmit={handleSubmit} noValidate>
                    <div className='d-flex text-center'>
                        <div className="form-group col-md-4 ms-5 ">
                            <label>Name</label>
                            <input defaultValue={profile?.name} autoComplete='off' type="text" name="name" className="form-control" placeholder="Name" onChange={handleChange}  />
                        </div>
            </div>
            <div className="mb-3">
  <label htmlFor="formFile" className="form-label">Your profile picture</label>
  <input defaultValue={profile?.picture} name="picture" className="form-control" id="formFile" />
</div>
{
  loading ? 
  <div className='text-center mt-3 mb-3'>
  <div className="spinner-border text-primary" role="status">
      {/* <span className="sr-only">Loading...</span> */}
  </div>
  </div>
: 
<div className='text-center mt-3'>
                <button type="submit" className="btn btn-primary">Send</button>
            </div>
}
            
        </form>
        {
                loading ? '' : <button className="btn btn-danger" onClick={closeModal}>CLOSE</button>
        }
        </Modals>
            <div className="accordion mb-3 me-3" id="accordionExample">
  <div className="accordion-item bg-light">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button collapsed bg-info" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <ImProfile size={30} className="me-2" /> Personal data
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <h1> {profile?.name} </h1>
        <h2> {profile?.email} </h2>
        <p> Picture: {profile?.picture !== undefined ? `${profile?.picture}` : 'None'}</p>
        <button className="btn btn-warning" onClick={() => openedModal()}>Edit</button>
      </div>
    </div>
  </div>
  <div className="accordion-item bg-light">
    <h2 className="accordion-header" id="headingTwo">
      <button className="accordion-button collapsed bg-info" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      <BiPurchaseTagAlt size={30} className="me-2" />  Orders
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      {profile?.orders?.length > 0 ?
                            profile?.orders?.map((o, i) => {
                                return (
                                    <div className="card d-inline-flex ms-4 mb-3" style={{width: '19rem', height: '230px'}} key={i}>
                                        <div className="card-body">
                                            <h5 className="card-title">{o?.purchased_Movie?.title}</h5>
                                            <p className="card-text">Order ID: {o?._id}</p>
                                            <p className="card-text">Money spent: ${o?.purchased_Movie?.price?.toFixed()}</p>
                                            <Link to={`/purchasedMovie/${o?.purchased_Movie?.id}`} className="btn btn-primary">View</Link>
                                        </div>
                                    </div>
                                )
                            }) : 'None'
                        }
      </div>
    </div>
  </div>
  <div className="accordion-item bg-light">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed bg-info" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        <CgComment size={30} className="me-2" /> Comments
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      {profile?.comments?.length > 0 ?
                            profile?.comments?.map((o, i) => {
                                return (
                                    <div className="card d-inline-flex ms-4 mb-3" style={{width: '19rem'}} key={i}>
                                        <div className="card-body">
                                            <h5 className="card-title">{o?.movieName}</h5>
                                            <p className="card-text">{o?.text}</p>
                                        </div>
                                    </div>
                                )
                            }) : 'None'
                        }
      </div>
    </div>
  </div>
</div>
        </div>
    )
}