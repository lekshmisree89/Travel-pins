import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import '../App.css';
import { CountryCard } from '../components/CountryCard';
import { Country } from '../models/Country';
import { useMutation } from '@apollo/client';
import { DELETE_COUNTRY} from '../utils/mutations';


export const SavedDishesPage = () => {




  // Fetch user data

  const { loading, error,data} = useQuery(GET_ME);



  const [deleteCountry] = useMutation(DELETE_COUNTRY, {
    refetchQueries: ['GET_ME'], // Refetch queries after deleting
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
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">Start your culinary journey by adding some countries!</p>
      )}
    </div>
  );
};