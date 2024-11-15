import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';



import { GET_ME} from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? GET_ME : GET_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  
  // This if condition checks if the user is logged in and if the logged-in user's username matches the userParam.
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    // If the condition is true, it navigates to the "/me" route, which is likely the user's profile page.
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-3 p-3">
          <p>
            Username: {user.username}
          </p>
        {!userParam && (
            <p>Email: {user.email}</p>

        )}
      </div>
    </div>
    </div>
    );
};

export default Profile;
