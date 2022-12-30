import { Link } from "react-router-dom"
import Header from "./Header"
import sadHeart from "../assets/sadHeart.png"

export default function Favourites(props) {

    /* const [favs, setFavs] = useState([])
    const favMovies = localStorage.getItem('favs')

    useEffect(() => {
        if(favMovies !== null) {
            const favsArray = JSON.parse(favMovies)
            setFavs(favsArray)
        } 
    }, [favMovies]) */

    return (
        <>
            <h2>Your Favourites:</h2>
            {props.favs.length === 0 && 
            <div className="col-12 text-danger">
                <h3>You don't have any favourite film!</h3>
                <img src={sadHeart} alt='Not found' />
            </div>
            }
            <div className="row">
            {props.favs?.map((m, i) => {
                return (
                    <div className="col-3" key={i}>
                        <div className="card my-4">
                            <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${m.imgURL}`} alt="film" />
                                <button className="favourite-btn" onClick={props.addOrRemoveFromFavs} data-movie-id={m.id}>❤️</button>
                                <div className="card-body">
                                    <h5 className="card-title"> {m.title} </h5>
                                    <p className="card-text"> {m.overview.substring(0, 100)}... </p>
                                    <Link to={`/movie/${m.id}`} className="btn btn-primary">View details</Link>
                                </div>
                        </div>
                    </div>
                )
            })}
            </div>
        </>
    )
}