import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import '../App.css';
import { CountryCard } from '../components/CountryCard';
import { Country } from '../models/Country';

export const SavedDishesPage = () => {
  // Fetch user data
  const { loading, error, data } = useQuery(GET_ME);
  if (loading) return <p>Loading saved countries...</p>;
  if (error) return <p>Error loading saved countries: {error.message}</p>;

  const countries = data?.me?.countries || [];

  // // Add user country mutation
  // const [addUserCountry] = useMutation(ADD_USER_COUNTRY);

  // // Mutations for deleting a country and dishes
  // const [deleteCountry] = useMutation(DELETE_COUNTRY);
  // const [deleteDishes] = useMutation(DELETE_DISHES);

  // // Handle removing a country
  // const handleDeleteCountry = async (countryId: string) => {
  //   try {
  //     await deleteCountry({ variables: { countryId } });
  //     refetch(); // Refresh the list after deletion
  //     console.log('Country removed successfully!');
  //   } catch (err) {
  //     console.error('Error deleting country:', err);
  //   }
  // };

  // // Handle removing a dish from a country
  // const handleDeleteDish = async (countryId: string, dishId: string) => {
  //   try {
  //     await deleteDishes({ variables: { countryId, dishId } });
  //     refetch(); // Refresh the list after deletion
  //     console.log('Dish removed successfully!');
  //   } catch (err) {
  //     console.error('Error deleting dish:', err);
  //   }
  // };

  return (
    <div className="saved-dishes-container">
      <h1>My Countries</h1>
      {countries.length > 0 ? (
        <div className="countries-grid">
          {countries.map((country: Country, index: number) => (
            <CountryCard
              key={index}
              country={{
                name: country.name,
                dishes: country.dishes
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