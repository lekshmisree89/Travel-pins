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
                    <h1>Welcome to DishList</h1>
                    <p>
                        Please log in to explore and add to your travel journals. 
                        Discover and share your picks for the best local dishes around the world!
                    </p>
                </div>
            </div>
        );
    }

    return children;
};
