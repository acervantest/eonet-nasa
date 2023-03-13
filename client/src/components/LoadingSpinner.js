
//component responsible for displaying a loading spinner
const LoadingSpinner = () => {
    return (
        <div>
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingSpinner