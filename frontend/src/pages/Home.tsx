import React, { useContext, useEffect, useState } from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsLetterBox from '../components/NewsLetterBox';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import type { Product } from '../interfaces/ShopContext.interface';

const Home = () => {
  const { myProducts, search } = useContext(ShopContext)!;
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);

  useEffect(() => {
    if (search.trim() !== '') {
      const results = myProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [search, myProducts]);

  return (
    <div>

      {/* 🔍 Search Results */}
      {filteredResults.length > 0 ? (
        <div className='my-8'>
          <h2 className='text-xl font-semibold mb-4'>Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredResults.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <Hero />
          <LatestCollection />
          <BestSeller />
          <OurPolicy />
          <NewsLetterBox />
        </>
      )}
    </div>
  );
};

export default Home;
