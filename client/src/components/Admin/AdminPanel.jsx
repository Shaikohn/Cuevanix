import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllInquiries } from "../../redux/actions/inquirieActions";
import { Link } from "react-router-dom";
import { getProfileById } from "../../redux/actions/userActions";

export default function AdminPanel() {

    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const { inquiries } = useSelector(state => state.inquirie)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllInquiries())
        if(localUser) {
            dispatch(getProfileById(localUser.result._id))
        }
    }, [dispatch])

    return (
        <div className="bg-dark text-light py-5">
  <NavBar />

  <div className="container">
    <div className="text-center mb-4">
      <h1 className="fw-bold">Admin Panel</h1>
      <p className="text-muted">
        Here you can view and manage all the inquiries sent by users.
      </p>
      <p className="text-info fw-semibold mt-2">
        Total inquiries: {inquiries.length}
      </p>
    </div>

    {inquiries.length > 0 ? (
      <div className="d-flex flex-column align-items-center gap-4">
        {inquiries.map((inq, i) => (
          <Link
            key={i}
            to={`inquiry/${inq._id}`}
            className="text-decoration-none w-100"
            style={{ maxWidth: '600px' }}
          >
            <div
              className="card p-3 border-0 shadow-sm"
              style={{
                backgroundColor: '#1e1e2f',
                color: 'white',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.02)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              <h5 className="mb-0">{inq?.name} has sent an inquiry!</h5>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <div className="text-center mt-5">
        <h4 className="text-secondary">There are no inquiries to display.</h4>
      </div>
    )}
  </div>
</div>


    )
}