import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { DELETE_COUNTRY } from '../utils/mutations'; // Import the DELETE_COUNTRY mutation
import '../App.css';
import { CountryCard } from '../components/CountryCard';
import { Country } from '../models/Country';

export const SavedDishesPage = () => {
  // Fetch user data
  const { loading, error, data } = useQuery(GET_ME);
  const [deleteCountry] = useMutation(DELETE_COUNTRY, {
    refetchQueries: [{ query: GET_ME }], // Refetch the user's data after deletion
  });

  if (loading) return <p>Loading saved countries...</p>;
  if (error) return <p>Error loading saved countries: {error.message}</p>;

  const countries = data?.me?.countries || [];

  // Handler to delete a country
  const handleDeleteCountry = async (countryId: string) => {
    try {
      await deleteCountry({
        variables: { countryId },
      });
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

  return (
    <div className="saved-dishes-container">
      <h1>My Countries</h1>
      {countries.length > 0 ? (
        <div className="countries-grid">
          {countries.map((country: Country) => (
            <CountryCard
              key={country.countryName}
              country={{
                countryName: country.countryName,
                dishes: country.dishes,
                notes: country.notes,
                onDeleteCountry: handleDeleteCountry, // Pass the delete handler to CountryCard
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
