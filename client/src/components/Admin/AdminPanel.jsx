
import { Link } from "react-router-dom";


export default function AdminPanel() {

    return (
        <div>
            <Link to={`/movies`} /* className="btn btn-primary" */>Movies</Link>
            <Link to={`/users`} /* className="btn btn-primary" */>Users</Link>
            <Link to={`/orders`} /* className="btn btn-primary" */>Orders</Link>
        </div>
    )
}