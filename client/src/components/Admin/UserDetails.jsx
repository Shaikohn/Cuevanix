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
        <div className="ms-3">
            <NavBar />
            <div className="d-flex mb-3 mt-3 justify-content-center">
                {user?.picture !== undefined ? <img style={{borderRadius: '50px', width: '150px'}} src={user?.picture} alt={user?.name} referrerPolicy="no-referrer" /> : ''}
                <div className="ms-2">
                    <h1 className="text-align-center"> {user?.name} </h1>
                    <div className='displayFlexInPC mt-3'>
                        {user?.owner === true ? <h3 className="text-warning">Role: Owner</h3> : user?.admin === true ? <h3 className="text-warning">Role: Admin</h3> : <h3>Role: User</h3>}
                        {profile?.owner === true && profile?._id !== _id && user?.banned === false && user?.admin === false ? <button onClick={() => dispatch(patchUserRole(_id))} type="button" className="btn btn-success ms-3">Promote</button> :''}
                        {profile?.owner === true && profile?._id !== _id && user?.banned === false && user?.admin === true ? <button onClick={() => dispatch(patchUserRole(_id))} type="button" className="btn btn-danger ms-3">Downgrade</button> :''}
                        <h3 className="marginProfileDetails"> Status: {user?.banned === true ? 'Banned' : 'Active'} </h3> 
                        {user?.owner === false && profile?._id !== user?._id && user?.banned === false ? <button onClick={() => dispatch(patchUserStatus(_id))} type="button" className="btn btn-danger ms-3">Ban</button> :''}
                        {user?.owner === false && profile?._id !== user?._id && user?.banned === true ? <button onClick={() => dispatch(patchUserStatus(_id))} type="button" className="btn btn-secondary ms-3">Unban</button> :''}
                    </div>
                </div>
            </div>
            <div className="accordion mb-3 me-3" id="accordionExample">
                <div className="accordion-item bg-light">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button collapsed bg-info" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <ImProfile size={30} className="me-2" /> Personal data
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <h1> {user?.name} </h1>
                            <h2> {user?.email} </h2>
                            <p style={{wordWrap: 'break-word', width: '350px'}}> Picture: {profile?.picture !== undefined ? `${profile?.picture}` : 'None'}</p>
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
                            {user?.orders?.length > 0 ?
                                user?.orders?.map((o, i) => {
                                    return (
                                        <div className="card d-inline-flex ms-4 mb-3" style={{width: '19rem', height: '230px'}} key={i}>
                                            <div className="card-body">
                                                <h5 className="card-title">{o?.purchased_Movie?.title}</h5>
                                                <p className="card-text">Order ID: {o?._id}</p>
                                                <p className="card-text">Money spent: ${o?.purchased_Movie?.price?.toFixed()}</p>
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
                            {user?.comments?.length > 0 ?
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