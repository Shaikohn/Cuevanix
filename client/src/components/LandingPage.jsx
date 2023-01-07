import Cinema from "../assets/Cuevanix.jpg"
import Popcorn from "../assets/Popcorn.png"

export default function LandingPage() {
    return (
        <>
        <div className="bg-light d-flex">
        <img src={Cinema} alt="cinema" style={{height: '450px', width: '100%'}} />
        <img src={Popcorn} alt="popcorn" />
        </div>
        </>
    )
}