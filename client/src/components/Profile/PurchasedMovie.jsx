import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getMovieVideos, getPurchasedMovie } from "../../redux/actions/movieActions"
import { clearPurchasedMovie, clearVideos } from "../../redux/slices/movieSlice"
import ReactPlayer from 'react-player/lazy'


export default function PurchasedMovie() {

    let { id } = useParams()
    const dispatch = useDispatch()

    const videos  = useSelector(state => state.movies.videos)
    const video = videos.find((v) => v.type === "Trailer")

    useEffect(() => {
        dispatch(clearVideos())
        dispatch(getMovieVideos(id))
    }, [dispatch, id])

    /* let { id } = useParams()
    const dispatch = useDispatch()
    const purchasedMovie  = useSelector(state => state.movies.purchasedMovie)
    const videos  = useSelector(state => state.movies.videos)
    const video = videos.find((v) => v.type === "Trailer")
    console.log('videos', videos)

    useEffect(() => {
        dispatch(clearPurchasedMovie())
        dispatch(clearVideos())
        dispatch(getPurchasedMovie(id))
        dispatch(getMovieVideos(id))
    }, [dispatch, id])

    return (
        <div className="bg-light">
            <h1> {purchasedMovie?.title} </h1>
            <div className="d-flex">
                <img style={{height: '425px'}} src={purchasedMovie?.image} alt={purchasedMovie?.title} />
                <div className="d-inline-block">
                <ReactPlayer className="rounded mx-auto d-block" url={`https://www.youtube.com/watch?v=${video?.key}`}  />
                <p className="ms-2">{purchasedMovie?.overview}</p>
                </div>
            </div>
        </div>
    ) */
    return (
        <ReactPlayer width='100%' className="rounded mx-auto d-block" url={`https://www.youtube.com/watch?v=${video?.key}`}  />
    )
}