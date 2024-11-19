import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { DELETE_COUNTRY } from '../utils/mutations';
import '../App.css';
import { CountryCard } from '../components/CountryCard';
import { Country } from '../models/Country';
import { User } from '../models/User'; // Import the User interface

export const SavedDishesPage = () => {
  // Fetch user data
  const { loading, error, data } = useQuery<{ me: User }>(GET_ME); // Use the User type here
  const [deleteCountry] = useMutation(DELETE_COUNTRY);

  if (loading) return <p>Loading saved countries...</p>;
  if (error) return <p>Error loading saved countries: {error.message}</p>;

  const countries = data?.me?.countries || [];

  const handleDeleteCountry = (countryId: number) => {
    deleteCountry({
      variables: { countryId },
      update: (cache) => {
        const existingCountries = cache.readQuery<{ me: User }>({ query: GET_ME });
        const newCountries = existingCountries?.me?.countries.filter(
          (country: Country) => country.countryId !== countryId // Compare by countryId (number)
        );
  
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
  

  return (
    <div className="saved-dishes-container">
      <h1>My Countries</h1>
      {countries.length > 0 ? (
        <div className="countries-grid">
          {countries.map((country: Country) => (
           <CountryCard
           key={country.countryId}
           country={country}
           onDelete={handleDeleteCountry}  // Pass the delete handler
         />
          ))}
        </div>
      ) : (
        <p className="empty-state">Start your culinary journey by adding some countries!</p>
      )}
    </div>
  );
};
