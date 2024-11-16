import axios from 'axios';

const API_KEY = 'your_rapidapi_key';  // Replace with your actual RapidAPI key

// Function to fetch national dishes by country name
const fetchNationalDish = async (countryName: string) => {
  try {
    const response = await axios.get(`https://cuisine-api.p.rapidapi.com/recipes/${countryName}`, {
      headers: {
        'X-RapidAPI-Host': 'cuisine-api.p.rapidapi.com',
        'X-RapidAPI-Key': API_KEY
      }
    });
    return response.data;  // Return the data (national dishes)
  } catch (error) {
    console.error('Error fetching national dish:', error);
    throw error;  // Rethrow error for further handling
  }
};

export default fetchNationalDish;
