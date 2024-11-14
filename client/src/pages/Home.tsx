import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Home = () => {
    const { loading, data} = useQuery(GET_ME);
    const user = data?.me || null;

    if (loading) return <p>Loading...</p>;
   

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-lg-10">
                    <div className="card">
                        <h4 className="card-header bg-dark text-light p-2">TRAVEL-PIN HOME</h4>
                        <div className="card-body">
                            {user ? (
                                <div>
                                    <p className="username">Username: {user.username}</p>
                                    <p>Email: {user.email}</p>
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
