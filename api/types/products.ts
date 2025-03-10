export interface Product {
  id?: number;
  name: string;
  price: string;
  image: string;
  isblocked?: boolean;
  createdAt?: Date;
  categoryId: number;
}
