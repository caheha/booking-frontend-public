export default function ProtectedRoute({ id, children }) {
    // If no token is stored, and no user is logged in, show error page
    if (!localStorage.getItem('token') && !id) return (
        <>
            <div className="container">
                <h1>Hovsa..</h1>
                <p>Denne side er kun for medlemmer. Log venligst ind, eller opret dig som bruger.</p>
            </div>
        </>
    );

    // If user is logged in, allow them to see protected route
    return children;
};