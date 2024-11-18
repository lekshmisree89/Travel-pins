import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Home = () => {
    const { loading, data, error } = useQuery(GET_ME);
    const user = data?.me || null;
    console.log('user:' ,user);

    console.log('data:', data);
    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error('Error fetching data:', error.message);
        return <p>Error fetching user data. Please try again.</p>;
    }

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-lg-10">
                    <div className="card">
                        <h4 className="card-header bg-dark text-light p-2">TRAVEL-PIN HOME</h4>
                        <div className="card-body">
                            {user ? (
                                <div>
                                  
                                    <p>{user.name}</p>
                                    <h4>Welcome back, {user.username}! Explore and enjoy!</h4>
                                </div>
                            ) : (
                                <h4>You need to be logged in TO EXPLORE.</h4>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
