import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Searcher() {
    const navigateTo = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const keyword = e.target.keyword.value.trim();

        if (keyword.length === 0) {
            Swal.fire({
                title: 'FAILED SEARCH',
                text: 'You have to write a keyword!',
                icon: 'error',
                timer: 3000,
            });
        } else if (keyword.length < 4) {
            Swal.fire({
                title: 'FAILED SEARCH',
                text: 'You have to write more than 4 letters!',
                icon: 'error',
                timer: 3000,
            });
        } else {
            e.target.keyword.value = '';
            navigateTo(`/results?keyword=${keyword}`);
        }
    };

    return (
        <div className="w-100">
            <form className="d-flex align-items-center gap-2" onSubmit={submitHandler}>
                <input
                    autoComplete="off"
                    className="form-control bg-dark text-white border-0 rounded-pill px-4 py-2"
                    type="text"
                    name="keyword"
                    placeholder="Search movies..."
                    style={{
                        backgroundColor: "#1e1e2f",
                        color: "#ffffff",
                        fontWeight: "500",
                    }}
                />
                <button
                    className="btn rounded-pill px-4 py-2"
                    type="submit"
                    style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
                >
                    Search
                </button>
            </form>
        </div>
    );
}