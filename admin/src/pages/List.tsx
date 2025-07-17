/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

interface AddProps {
  token: string;
}

const List: React.FC<AddProps> = ({ token }) => {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch product list
  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 const removeProduct = async (id: string) => {
  try {
    // For 100% certainty, send Authorization header
    const response = await axios.post(
      backendUrl + '/api/product/remove',
      { id },
      // { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchList();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Something went wrong");
  }
};


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>All Products List</p>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='flex flex-col gap-2'>
          {/* List Table Title */}
          <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className='text-center'>Action</b>
          </div>
          {/* Product List */}
          {list.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No products found.</div>
          ) : (
            list.map((item, index) => (
              <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 border text-center" key={index}>
                <img className='w-12' src={item.image?.[0] || "https://via.placeholder.com/48"} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{"Rs "}{item.price}</p>
                <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg text-red-600 hover:text-red-800' title="Delete">X</p>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default List;
