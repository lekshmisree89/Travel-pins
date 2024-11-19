import { Country } from '../models/Country';

interface CountryCardProps {
  country: Country;
  onDelete: (Id:number) => void; // onDelete expects a function that takes a string
}

export const CountryCard = ({ country, onDelete }: CountryCardProps) => {
  return (
    <div className="country-card">
      <div className="country-header">
        <h2>{country.countryName}</h2>
      </div>

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

      <button onClick={() => onDelete(country.countryId)}>
      Delete Country</button> {/* Pass the delete function */}
    </div>
  );
};
