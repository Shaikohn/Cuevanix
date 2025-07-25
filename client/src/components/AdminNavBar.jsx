import { Link } from "react-router-dom";


export default function NavBar() {
    return (
        <div>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link className="nav-link" to={`/adminPanel`}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/movies`}>Movies</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/users`}>Users</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/orders`}>Orders</Link>
                </li>
            </ul>
        </div>
    )
}