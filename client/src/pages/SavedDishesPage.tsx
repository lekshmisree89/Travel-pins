import { useQuery, useMutation } from '@apollo/client';
import { GET_COUNTRIES } from '../utils/queries'; // Define this query to fetch saved countries
import { DELETE_COUNTRY, DELETE_DISHES } from '../utils/mutations';
import { ADD_USER_COUNTRY } from '../utils/mutations';
import '../App.css';

export const SavedDishesPage = () => {
  // Fetch saved countries with their dishes
  const { loading, error, data, refetch } = useQuery(GET_COUNTRIES);

// Add user country mutation
const [addUserCountry] = useMutation(ADD_USER_COUNTRY);

  // Mutations for deleting a country and dishes
  const [deleteCountry] = useMutation(DELETE_COUNTRY);
  const [deleteDishes] = useMutation(DELETE_DISHES);

  // Handle removing a country
  const handleDeleteCountry = async (countryId: string) => {
    try {
      await deleteCountry({ variables: { countryId } });
      refetch(); // Refresh the list after deletion
      console.log('Country removed successfully!');
    } catch (err) {
      console.error('Error deleting country:', err);
    }
  };

  // Handle removing a dish from a country
  const handleDeleteDish = async (countryId: string, dishId: string) => {
    try {
      await deleteDishes({ variables: { countryId, dishId } });
      refetch(); // Refresh the list after deletion
      console.log('Dish removed successfully!');
    } catch (err) {
      console.error('Error deleting dish:', err);
    }
  };

  if (loading) return <p>Loading saved countries...</p>;
  if (error) return <p>Error loading saved countries: {error.message}</p>;

  return (
    <div className="saved-dishes-container">
      <h1>Saved Countries and Dishes</h1>
      {data?.savedCountries?.length > 0 ? (
        <ul>
          {data.savedCountries.map((country: any) => (
            <li key={country._id}>
              <h3>{country.name}</h3>
              <p><strong>Notes:</strong> {country.notes}</p>
              <button onClick={() => handleDeleteCountry(country._id)}>Delete Country</button>
              <ul>
                {country.dishes.map((dish: any) => (
                  <li key={dish._id}>
                    {dish.name}
                    <button onClick={() => handleDeleteDish(country._id, dish._id)}>Delete Dish</button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved countries or dishes found.</p>
      )}
    </div>
  );
};
