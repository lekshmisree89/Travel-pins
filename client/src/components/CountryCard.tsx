import '../styles/CountryCard.css';
import { Country } from '../models/Country';

interface CountryCardProps {
  country: Country;
  onDeleteCountry?: (countryName: string) => void;
}

export const CountryCard = ({ country }: CountryCardProps) => {

  const handleDeleteCountry = () => {
    if (country.onDeleteCountry) {
      country.onDeleteCountry(country.countryName);
    }
  };

  return (
    <div className="country-card">
      <div className="country-header">
        <h2>{country.countryName}</h2>
      </div>
      <button onClick={handleDeleteCountry} className="delete-btn">
          🗑 Delete Country
        </button>
      <div className="dishes-section">
        <h3>🍽 Dishes</h3>
        <ul className="dishes-list">
          {country.dishes.map((dish, index) => (
            <li key={index} className="dish-item">
              {dish.dishName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}; 