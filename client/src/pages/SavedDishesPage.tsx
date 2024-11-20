import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import '../App.css';
import { CountryCard } from '../components/CountryCard';
import { Country } from '../models/Country';
//import { Dish } from '../models/Country';
import { useMutation } from '@apollo/client';
import { DELETE_COUNTRY, DELETE_DISHES } from '../utils/mutations';
import { useEffect, useState } from 'react';


export const SavedDishesPage = () => {
  const [refresh, setRefresh] = useState(false);
  
  const { loading, error, data, refetch } = useQuery(GET_ME);

  useEffect(() => {
    if (refresh) {
      refetch();
      setRefresh(false);
    }
  }, [refresh, refetch]);

  const [deleteCountry] = useMutation(DELETE_COUNTRY, {
    onCompleted: () => setRefresh(true),
    refetchQueries: ['GET_ME'],
    awaitRefetchQueries: true,
  });
  
  const [deleteDishes] = useMutation(DELETE_DISHES, {
    onCompleted: () => setRefresh(true),
    refetchQueries: ['GET_ME'],
    awaitRefetchQueries: true,
  });

  if (loading) return <p>Loading saved countries...</p>;
  if (error) return <p>Error loading saved countries: {error.message}</p>;


  const countries = data?.me?.countries || [];

  console.log('log: countries', countries);


  // // Add user country mutation
  // const [addUserCountry] = useMutation(ADD_USER_COUNTRY);
  const handleDeleteCountry = async (countryId: number) => {
    try {
      const { data } = await deleteCountry({ variables: { countryId } });
      if (data?.deleteCountry) {

     

        console.log(`Deleted country with ID: ${countryId}`);
      } else {
        console.error('Failed to delete country.');
      }
    } catch (err) {
      console.error('Error deleting country:', err);
    }
  };

 
const handleDeleteDish = async ( dishId: number) => {

  try {
    const { data } = await deleteDishes({ variables: { dishId } });
    if (data?.deleteDishes) {
      console.log(`Deleted dish with ID: ${dishId}`);
    } else {
      console.error('Failed to delete dish.');
    }
  } catch (err) {
    console.error('Error deleting dish:', err);
  }
}






























  
  

  return (
    <div className="saved-dishes-container">
      <h1>My Countries</h1>
      {countries.length > 0 ? (
        <div className="countries-grid">
          {countries.map((country: Country, index: number) => (
            <CountryCard
              key={index}
              country={country}
              onDeleteCountry={()=> handleDeleteCountry(country?._id)}
              onDeleteDish={() => handleDeleteDish(country?.dishes[0]?.id)}

            />
          ))}
        </div>
      ) : (
        <p className="empty-state">Start your culinary journey by adding some countries!</p>
      )}
    </div>
  );
};