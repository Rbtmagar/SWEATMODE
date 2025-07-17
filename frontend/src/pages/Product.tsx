

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import type { Product as ProductType } from '../interfaces/ShopContext.interface';
import { FaStar } from 'react-icons/fa';
import RelatedProducts from '../components/RelatedProducts';


const Product = () => {
  const { productId } = useParams();
  const { myProducts, addToCart } = useContext(ShopContext)!;

  const [productData, setProductData] = useState<ProductType | null>(null);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const product = myProducts.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, myProducts]);

useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [productId]);

  return productData ? (
    <div className='border-t-2 pt-10'>
      <div className='flex flex-col sm:flex-row gap-10'>
        {/* Image Preview Section */}
        <div className='flex flex-col sm:flex-row gap-4 sm:w-1/2'>
          <div className='flex sm:flex-col gap-3'>
            {productData.image.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Product ${i}`}
                onClick={() => setImage(img)}
                className={`w-16 h-16 cursor-pointer border ${image === img ? 'border-black' : 'border-gray-300'}`}
              />
            ))}
          </div>
          <img src={image} alt="Main Product" className='w-full max-w-md object-contain' />
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='text-2xl font-semibold mb-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 my-2">
          {[...Array(4)].map((_, i) => (
           <FaStar key={i} className="text-red-500" />
          ))}
            <FaStar className="text-gray-300" />
            <p className='pl-2'>(128)</p>
            </div>
          <p className='text-gray-700 mb-4'>{productData.description}</p>
          <p className='text-xl font-bold mb-4'>Rs {productData.price}</p>

          {/* Size Selection */}
          <div className='mb-4'>
            <h3 className='font-medium mb-2'>Select Size:</h3>
            <div className='flex gap-3'>
              {productData.sizes.map((size, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size ? 'bg-black text-white' : 'bg-white border-gray-400'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className='mb-4 flex gap-3 items-center'>
            <span className='font-medium'>Quantity:</span>
            <button
              onClick={() => setQuantity(prev => Math.max(prev-1, 1))}
              className='px-3 border'
            >-</button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(prev => prev + 1)}
              className='px-3 border'
            >+</button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={()=> addToCart(productData._id, selectedSize, quantity)}
            className='bg-black text-white px-6 py-2 rounded mt-4 hover:opacity-90 transition active:bg-gray-800'
          >
            Add to Cart
          </button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available in this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description and Review Section */}
      <div className='mt-20'>
              <div className='flex'>
                <b className='border px-5 py-3 text-sm'>Description</b>
                <p className='border px-5 py-3 tex-sm'>Reviews (128)</p>
              </div>
              <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                <p>
                  This premium quality gym wear is designed for both comfort and performance.
                  Made from breathable and stretchable materials, it's perfect for intense workouts
                  or casual training sessions. The fabric is sweat-wicking, lightweight, and durable,
                  ensuring long-lasting use even in tough gym environments.
                </p>
                <p>
                  Whether you're into strength training, yoga, or cardio, this outfit supports your movement
                  while maintaining style. Trusted by over 10,000 athletes and gym enthusiasts across the country.
                </p>
                {/* <div className="mt-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Top Customer Reviews:</h4>
                  <ul className="list-disc pl-6 text-gray-600">
                    <li>⭐️⭐️⭐️⭐️⭐️ "Super comfortable and stylish – perfect fit for my training routine!"</li>
                    <li>⭐️⭐️⭐️⭐️ "Great value for the price. The fabric quality is top-notch."</li>
                    <li>⭐️⭐️⭐️⭐️ "Nice stretch and breathable material. I'd recommend it to my gym buddies."</li>
                  </ul>
                </div> */}
              </div>
      </div>
      {/* Display related products */}
        {productData && (
          <RelatedProducts
            category={productData.category}
            subCategory={productData.subCategory}
          />
        )}
    </div>
  ) : (
    <div className='text-center py-10'>Loading product details...</div>
  );
};

export default Product;

