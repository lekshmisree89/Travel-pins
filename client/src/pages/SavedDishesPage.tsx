import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import '../App.css';
import { CountryCard } from '../components/CountryCard';
import { Country } from '../models/Country';
//import { useMutation } from '@apollo/client';
//import { DELETE_COUNTRY, DELETE_DISHES } from '../utils/mutations';

export const SavedDishesPage = () => {
  // Fetch user data
  const { loading, error,data} = useQuery(GET_ME);
  if (loading) return <p>Loading saved countries...</p>;
  if (error) return <p>Error loading saved countries: {error.message}</p>;

  const countries = data?.me?.countries || [];


  // // Add user country mutation
  // const [addUserCountry] = useMutation(ADD_USER_COUNTRY);

 











  

  return (
    <div className="saved-dishes-container">
      <h1>My Countries</h1>
      {countries.length > 0 ? (
        <div className="countries-grid">
          {countries.map((country: Country, index: number) => (
            <CountryCard
              key={index}
              country={{
                countryName: country.countryName,
                dishes: country.dishes,
                // Pass delete handler
                 // Pass dish delete handler
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