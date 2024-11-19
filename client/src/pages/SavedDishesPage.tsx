import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import '../App.css';
import { CountryCard } from '../components/CountryCard';
import { Country } from '../models/Country';
import { useMutation } from '@apollo/client';
import { DELETE_COUNTRY, DELETE_DISHES } from '../utils/mutations';

export const SavedDishesPage = () => {
  // Fetch user data
  const { loading, error,data} = useQuery(GET_ME);


  

  const [deleteCountry] = useMutation(DELETE_COUNTRY);

  // Handle country deletion
  const handleDeleteCountry = (countryId: string) => {
    deleteCountry({
      variables: { countryId },  // Pass the countryId to the mutation
      update: (cache) => {
        // Update the cache to remove the deleted country from the list
        const existingCountries = cache.readQuery({ query: GET_ME });
        const newCountries = existingCountries?.me?.countries.filter((country: Country) => country._id !== countryId);
        
        cache.writeQuery({
          query: GET_ME,
          data: {
            me: {
              ...existingCountries?.me,
              countries: newCountries,
            },
          },
        });
      },
    });
  };

  // // Add user country mutation
  // const [addUserCountry] = useMutation(ADD_USER_COUNTRY);
  if (loading) return <p>Loading saved countries...</p>;
  if (error) return <p>Error loading saved countries: {error.message}</p>;


  const countries = data?.me?.countries || [];








  

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