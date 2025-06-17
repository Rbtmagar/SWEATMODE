import React, { createContext, useState } from "react";
import { myProducts } from "../assets/assets";
import type { ShopContextType } from "../interfaces/ShopContext.interface";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext<ShopContextType | null>(null);

const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const currency = 'Rs';
  const deliveryFee = 50;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // cartItems = { productId: { size: quantity } }
  const [cartItems, setCartItems] = useState<{ [key: string]: { [size: string]: number } }>({});
  const navigate = useNavigate()

  const addToCart = (itemId: string, size: string, quantity: number = 1) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }
    const cartData = JSON.parse(JSON.stringify(cartItems)); // deep copy

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += quantity;
      } else {
        cartData[itemId][size] = quantity;
      }
    } else {
      cartData[itemId] = { [size]: quantity };
    }

    setCartItems(cartData);
  };

  const getCartCount = () => {
      return Object.values(cartItems).reduce((total, sizeMap) => {
        return total + Object.values(sizeMap).reduce((sum, qty) => sum + qty, 0);
      }, 0);
    };



  const updateQuantity = (itemId: string, size: string, quantity: number) => {
  const cartData = structuredClone(cartItems);

  if (!cartData[itemId]) return;

  if (quantity <= 0) {
    delete cartData[itemId][size];
    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }
  } else {
    cartData[itemId][size] = quantity;
  }

  setCartItems(cartData);
};

  const getCartAmount = (): number => {
  let totalAmount = 0;

  for (const productId in cartItems) {
    const itemInfo = myProducts.find((product) => product._id === productId);

    if (!itemInfo) continue; // skip if product not found (safety check)

    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size];
      if (quantity > 0) {
        totalAmount += itemInfo.price * quantity;
      }
    }
  }

  return totalAmount;
};


  const clearCart = () => {
  setCartItems({});
  };

  




  const value: ShopContextType = {
    myProducts,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    clearCart,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
