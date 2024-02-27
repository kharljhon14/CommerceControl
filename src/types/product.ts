export interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  brand: string;
  price: number;
  category_id: string;
  on_sale: boolean;
  created_at: string;
  updated_at: string;
}
