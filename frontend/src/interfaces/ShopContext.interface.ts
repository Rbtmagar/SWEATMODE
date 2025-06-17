import type { NavigateFunction } from "react-router-dom";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: string;
  bestseller: boolean;
}


export interface ShopContextType {
  myProducts: Product[];
  currency: string;
  deliveryFee: number;

  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;

  cartItems: {
    [productId: string]: {
      [size: string]: number;
    };
  };
  addToCart: (itemId: string, size: string, quantity: number) => void;
  getCartCount: () => number;
  getCartAmount: ()=> number;

 updateQuantity: (itemId: string, size: string, quantity: number) => void;

  navigate: NavigateFunction;
 clearCart: () => void;


}
