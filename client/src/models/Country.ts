export interface Dish {
  id: number;
  dishName: string;
  description: string;
  image: string; // URL to the dish image
}

export interface Country {
  countryId: number; // Keep countryId as number
  countryName: string;
  dishes: Dish[]; // Array of dish objects
  notes?: string; // Optional field for additional notes about the country
  onDeleteCountry?: (countryId: number) => void;  // Update to number here
  onDeleteDish?: (countryId: number, dishId: number) => void; // Update to number here
}
