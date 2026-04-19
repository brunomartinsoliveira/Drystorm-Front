export type ProductCategory = 'masculino' | 'feminino';
export type ProductType = 'camiseta' | 'short';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: ProductCategory;
  type: ProductType;
  badge?: string;
}

export interface ProductGroup {
  title: string;
  icon: string;
  category: ProductCategory;
  type: ProductType;
  products: Product[];
}
