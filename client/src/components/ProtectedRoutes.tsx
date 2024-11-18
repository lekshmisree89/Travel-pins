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
                    <img src="../assets/travel 1.jpg" alt="Beautiful Beach" />
                    <img src= "../assets/travel 1.jpg"alt="Mountain Range" />
                    <img src="../assets/travel 1.jpg" alt="City Skyline" />
                </div>
            </div>
        );
    }

    return children;
};
