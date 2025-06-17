import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import type { Product } from '../interfaces/ShopContext.interface';

interface RelatedProductsProps {
  category: string;
  subCategory: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category, subCategory }) => {
  const { myProducts } = useContext(ShopContext)!;
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    if (myProducts.length > 0) {
      let myProductsCopy = myProducts.slice();
      myProductsCopy = myProductsCopy.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );
      setRelated(myProductsCopy);
    }
  }, [myProducts, category, subCategory]);

  return (
    <div className='mt-20'>
      <h2 className='text-lg font-semibold mb-4'>Related Products</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {related.length > 0 ? (
          related.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className='text-sm text-gray-500'>No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
