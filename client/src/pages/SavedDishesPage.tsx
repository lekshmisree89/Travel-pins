import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import '../App.css';
import { CountryCard } from '../components/CountryCard';
import { Country } from '../models/Country';
//import { Dish } from '../models/Country';
import { useMutation } from '@apollo/client';
import { DELETE_USER_COUNTRY} from '../utils/mutations';
import { useEffect, useState } from 'react';
import Auth from '../utils/auth';



export const SavedDishesPage = () => {
  const [refresh, setRefresh] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_ME);
  const [deleteUserCountry] = useMutation(DELETE_USER_COUNTRY, {
    onCompleted: () => setRefresh(true),
    refetchQueries: ['GET_ME'],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    if (refresh) {
      refetch();
      setRefresh(false);
    }
  }, [refresh, refetch]);

  if (loading) return <p>Loading saved countries...</p>;
  if (error) return <p>Error loading saved countries: {error.message}</p>;


  const countries = data?.me?.countries || [];

  console.log('log: countries', countries);


  const handleDeleteCountry = async (countryId: string) => {
    if (!Auth.loggedIn()) {
      console.error('Please log in to delete countries');
      return;
    }

    const profile = Auth.getProfile();
    const userId = profile?.data?._id;
    console.log('User ID:', userId);

    if (!userId) {
      console.error('Unable to get user profile');
      return;
    }

    try {      
      const { data } = await deleteUserCountry({
        variables: { 
          userId: userId,
          countryId: countryId
        }
      });
      
      if (data?.deleteUserCountry) {
        console.log(`Successfully deleted country with ID: ${countryId}`);
      } else {
        console.error('Failed to delete country');
      }
    } catch (err) {
      console.error('Error deleting country:', err);
    }
  };

 
// const handleDeleteDish = async ( dishId: number) => {

//   try {
//     const { data } = await deleteDishes({ variables: { dishId } });
//     if (data?.deleteDishes) {
//       console.log(`Deleted dish with ID: ${dishId}`);
//     } else {
//       console.error('Failed to delete dish.');
//     }
//   } catch (err) {
//     console.error('Error deleting dish:', err);
//   }
// }






























  
  

  return (
    <div className="saved-dishes-container">
      <h1>My Countries</h1>
      {countries.length > 0 ? (
        <div className="countries-grid">
          {countries.map((country: Country, index: number) => (
            <CountryCard
              key={index}
              country={country}
              onDeleteCountry={(countryId) => {
                console.log('Delete button clicked for country:', countryId);
                handleDeleteCountry(countryId);
              }}
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">Start your culinary journey by adding some countries!</p>
      )}
    </div>
  );
};