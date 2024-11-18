import React from 'react';
import Auth from '../utils/auth';
import '../App.css'; // Import the CSS file for styles

interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isLoggedIn = Auth.loggedIn();

    if (!isLoggedIn) {
        return (
            <div className="protected-route">
                <div className="welcome-message">
                    <h1>Welcome to Travel Pins</h1>
                    <p>
                        Please log in to explore and add your travel journals. 
                        Discover and share the best travel destinations around the world!
                    </p>
                </div>
                <div className="image-grid">

                    <img src="../image.jpg" alt="Beach" />

                    <img src= "../image2.jpeg" alt="Mountain" />

                    <img src="../image3.jpg" alt="City" />
                </div>
            </div>
        );
    }

    return children;
};
