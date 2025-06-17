import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import CartTotal from '../components/CartTotal';

interface CartItem {
  _id: string;
  size: string;
  quantity: number;
}

const Cart = () => {
  const { myProducts, currency, cartItems, updateQuantity, navigate, clearCart } = useContext(ShopContext)!;

  const [cartData, setCartData] = useState<CartItem[]>([]);

  useEffect(() => {
    const tempData: CartItem[] = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'Your '} text2={'Cart'} />
      </div>

      {cartData.map((item, index) => {
        const productData = myProducts.find((product) => product._id === item._id);
        if (!productData) return null;

        return (
          <div
            key={index}
            className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
          >
            {/* 🖼 Product Info */}
            <div className='flex items-start gap-6'>
              <img className='w-16 sm:w-20' src={productData.image[0]} alt='' />
              <div>
                <Link to={`/product/${productData._id}`}>
                  <p className='text-sm sm:text-lg font-medium hover:underline'>{productData.name}</p>
                </Link>
                <p className='text-sm text-gray-500'>{currency} {productData.price}</p> {/* 👈 Currency under name */}
                <p className='text-sm text-gray-500'>Size: {item.size}</p>
              </div>
            </div>

            {/* 🔢 Quantity */}
            <input onChange={(e)=>e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,item.size,Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />

            {/* 🗑️ Delete */}
            <button
              onClick={() => updateQuantity(item._id, item.size, 0)}
              className='text-red-500 hover:text-red-700'
              aria-label="Remove item from cart"
              title="Remove item from cart"
            >
              <FaTrash />
            </button>
          </div>
          
        );
      })}
      <div className=' flex justify-end my-20'>
            <div className='w-full sm:w-[450px]'>
                <CartTotal />
                <div className='w-full text-end'>
                  <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-4 hover:bg-gray-800'>Proceed to Checkout</button>
                </div>
            </div>
      </div> 
      <button
        onClick={clearCart}
        className='mt-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded text-sm'
      >
        Clear Cart
      </button>

    </div>
  );
};

export default Cart;
