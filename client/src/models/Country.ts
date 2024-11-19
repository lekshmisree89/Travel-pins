export interface Dish {
  id: number;
  dishName: string;
  description: string;
  image: string; // URL to the dish image
}

export interface Country {
  id?: number;
  countryName: string;
  dishes: Dish[]; // Array of dish objects
  notes?: string; // Optional field for additional notes about the country
  onDeleteCountry?: (countryId: string) => void;  // Optional function to delete a country
  onDeleteDish?: (countryId: string, dishId: string) => void; // Optional function to delete a dish
}
