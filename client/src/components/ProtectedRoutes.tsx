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
                    Welcome to DishList – your wishlist for exploring and saving the flavors of the world.
Dive into our Explore page to search for dishes by country, save your favorites, and build your personal collection of must-try meals.
Our dishes were thoughtfully selected UNESCO-recognized intangible cultural heritage foods or a country's own national dish, showcasing the authentic culinary identity of our world. 
                    </p>
                </div>
            </div>
        );
    }

    return children;
};
