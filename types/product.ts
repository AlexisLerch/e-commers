export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  categoryId: string | null; // <-- permitir null
}

export interface CartItem extends Product {
  quantity: number;
}
