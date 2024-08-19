import { Link } from "react-router-dom";

const ErrorBoundary = () => {
    return (
        <div>
            <h1>404 Page not found</h1>
            <button>
                <Link to={"/"}>
                Back Home
                </Link>
            </button>
        </div>
    )
}

export default ErrorBoundary;