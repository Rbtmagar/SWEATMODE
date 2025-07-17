import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import type { Product } from '../interfaces/ShopContext.interface';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { myProducts} = useContext(ShopContext)!;
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    setLatestProducts(myProducts.slice(0, 4)); // ✅display only 4 latest items
  }, [myProducts]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST '} text2={'COLLECTIONS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our latest arrivals built for comfort, performance, and everyday style.
        </p>
      </div>

      {/* Display the products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item,index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}  />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;





// import React, { useContext, useState, useEffect } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from './Title';

// const LatestCollection = () => {

//   const { myProducts} = useContext(ShopContext);
//   const [latestProducts,setLatestProducts] = useState([]);

//   useEffect(() => {
//     setLatestProducts(myProducts.slice(0,10));
//   },[])

//   return (
//     <div className="my-10">
//         <div className='text-center py-8 text-3xl'>
//             <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
//             <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'></p>
//         </div>

//     </div>
//   );
// };

// export default LatestCollection;
