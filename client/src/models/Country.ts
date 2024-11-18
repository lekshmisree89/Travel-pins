export interface Dish {
  id: number;
  dishName: string;
  description: string;
  image: string; // URL to the dish image
}

export interface Country {
  id: number;
  name: string;
  dishes: Dish[]; // Array of dish objects
  notes?: string; // Optional field for additional notes about the country
}
