import React from 'react';
import Auth from '../utils/auth';

interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isLoggedIn = Auth.loggedIn();

    if (!isLoggedIn) {
        return (
            <div>
        
                <p>Please login to continue</p>
            </div>
        )
    } else {
        return children;
    }
}