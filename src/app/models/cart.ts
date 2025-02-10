export interface Cart {
  id: number;
  products: { productId: number, quantity: number }[];
}
