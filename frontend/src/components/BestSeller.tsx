import React, { useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import type { Product } from '../interfaces/ShopContext.interface';

const BestSeller = () => {
  const { myProducts} = useContext(ShopContext)!;
  const [bestSeller, setBestSeller] = useState<Product[]>([]);
  useEffect(()=>{
    const bestProduct = myProducts.filter((item)=>(item.bestseller))
    setBestSeller(bestProduct.slice(0,4))
  },[myProducts])
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title  text1={'BEST '} text2={'SELLERS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        These are best selling products of this month</p>

      </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
            bestSeller.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
            ))
            }
        </div>
    </div>
  )
}

export default BestSeller
