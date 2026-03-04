export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
}

export interface CartItem extends Product {
  quantity: number;
}
