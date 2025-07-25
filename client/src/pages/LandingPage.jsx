import Cinema from "../assets/Cuevanix.jpg";
import{ Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <div className="bg-dark text-light min-vh-100">
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-md-7 mb-4 mb-md-0">
                        <img
                            src={Cinema}
                            alt="cinema"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                    <div className="col-md-5 text-center text-md-start">
                        <h1 className="display-4 fw-bold mb-3">
                            Welcome to <span style={{ color: '#0d6efd' }}>Cuevanix</span>
                        </h1>
                        <p className="lead mb-4 text-white-50">
                            Your ultimate destination for movies and series. Discover, explore and enjoy cinematic experiences — all in one place.
                        </p>
                        <Link
                            to="/catalog"
                            className="btn btn-primary btn-lg border-0 fw-semibold"
                            style={{
                                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                                color: '#fff',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 123, 255, 0.4)')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 123, 255, 0.2)')}
                        >
                            Enter the App
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-black bg-opacity-75 py-5">
                <div className="container">
                    <h2 className="text-center mb-5 text-light">Features</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card bg-dark text-light h-100 border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <h5 className="card-title">🔎 Smart Search</h5>
                                    <p className="card-text">Easily find your favorite movies and series with a powerful search engine.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card bg-dark text-light h-100 border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <h5 className="card-title">🎬 Trailer Viewer</h5>
                                    <p className="card-text">Watch trailers of the movies you've unlocked with your virtual purchases.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card bg-dark text-light h-100 border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <h5 className="card-title">🛒 Virtual Purchase</h5>
                                    <p className="card-text">Add movies to your collection — just for demo purposes, no real transactions.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card bg-dark text-light h-100 border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <h5 className="card-title">⭐ Ratings & Comments</h5>
                                    <p className="card-text">Leave feedback and rate the movies you've purchased for others to see.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card bg-dark text-light h-100 border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <h5 className="card-title">📁 Movie Collection</h5>
                                    <p className="card-text">Access your own personal library of movies anytime, anywhere.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-muted mt-5 small fst-italic">
                        ⚠️ This is a demo project for educational purposes only. No real purchases or content are hosted.
                    </p>
                </div>
            </div>
        </div>
    );
}