import React from "react";
import "./NotFound.css";

function NotFound() {
    return (
        <>
            <div className="wrapper">
                <div className="not-found-container">
                    <h1 className="not-found-heading">404 Page Not Found</h1>
                    <p className="not-found-message">
                        Oops, the page you're looking for doesn't exist. Please check the
                        URL and try again.
                    </p>
                </div>
            </div>
        </>
    );
}

export default NotFound;
