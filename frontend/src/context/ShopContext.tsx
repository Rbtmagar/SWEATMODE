/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useEffect, useState } from "react";
// import { myProducts } from "../assets/assets";   // adding products from local files
import type { ShopContextType, Product } from "../interfaces/ShopContext.interface";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";




// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext<ShopContextType | null>(null);

const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const currency = 'Rs';
  const deliveryFee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // cartItems = { productId: { size: quantity } }
  const [cartItems, setCartItems] = useState<{ [key: string]: { [size: string]: number } }>({});
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [token, setToken] = useState(localStorage.getItem('userToken') || '');
  const navigate = useNavigate()

  const addToCart = async (itemId: string, size: string, quantity: number = 1) => {
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

    if (token) {
      try {
        await axios.post(
          backendUrl + '/api/cart/add',
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error: any) {
        console.log(error)
         toast.error(error?.response?.data?.message || "Failed to sync cart");
      }
    }
  };

  const getCartCount = () => {
      return Object.values(cartItems).reduce((total, sizeMap) => {
        return total + Object.values(sizeMap).reduce((sum, qty) => sum + qty, 0);
      }, 0);
    };



  const updateQuantity = async (itemId: string, size: string, quantity: number) => {
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

  if (token) {
    try {
          await axios.post(
            backendUrl + '/api/cart/update',
            { itemId, size, quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );
      } catch (error: any) {
        console.log(error)
         toast.error(error?.response?.data?.message || "Failed to sync cart");
      }
  }
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

  const getProductsData = async () => {
  try {
    const response = await axios.get(backendUrl + '/api/product/list');
    // ^^^ Add the slash / after backendUrl to avoid URL issues
    console.log(response.data);
    if (response.data.success) {
      setMyProducts(response.data.products);
    } else {
      toast.error(response.data.message || "Failed to fetch products");
      console.error(response.data.message || "Failed to fetch products");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Error fetching products");
  }
};

const getUserCart = async (token: string) => {
  try {
    const response = await axios.post(
      backendUrl + '/api/cart/get',
      {}, // POST body is empty
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.data.success) {
      // Update cartItems state with cartData from backend
      setCartItems(response.data.cartData || {});
    }
  } catch (error: any) {
    console.log(error)
    toast.error(error?.response?.data?.message || "Failed to sync cart");
  }
}


  useEffect(()=>{
    getProductsData()
  },[])

useEffect(() => {
  if (token) {
    getUserCart(token);
  } else if (localStorage.getItem('userToken')) {
    const storedToken = localStorage.getItem('userToken') || '';
    setToken(storedToken);
    getUserCart(storedToken);
  }
}, [token]);




  const value: ShopContextType = {
    myProducts,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    clearCart,
    backendUrl,
    token, setToken,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
