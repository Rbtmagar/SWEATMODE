/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, type ChangeEvent } from 'react';
import { CloudUpload } from 'lucide-react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

interface AddProps {
  token: string;
}

const SIZES = ['S', 'M', 'L', 'XL'];

const Add: React.FC<AddProps> = ({ token }) => {
  // Image states
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [image4, setImage4] = useState<File | null>(null);

  // Preview URLs for images
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([null, null, null, null]);

  // Other form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState<string[]>([]);

  // Handle image upload and preview
  const handleImageChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    // Set image file and preview for the right box
    switch (index) {
      case 0:
        setImage1(file);
        break;
      case 1:
        setImage2(file);
        break;
      case 2:
        setImage3(file);
        break;
      case 3:
        setImage4(file);
        break;
    }
    const updatedPreviews = [...imagePreviews];
    updatedPreviews[index] = previewURL;
    setImagePreviews(updatedPreviews);
  };
  // Handle sizes selection
  const handleSizeClick = (size: string) => {
    setSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  // Handle form submit (expand with API integration as needed)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",JSON.stringify(bestseller))
      formData.append("sizes",JSON.stringify(sizes))

      if (image1) formData.append("image1",image1)
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData,)
      if (response.data.success) {
        toast.success(response.data.message)
        setName('');
      setDescription('');
      setPrice('');
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null);
      setImagePreviews([null, null, null, null]);
      setBestseller(false);
      setSizes([]);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <form className='flex flex-col w-full items-start gap-6' onSubmit={handleSubmit}>
      <div>
        <p className='mb-2 text-base font-semibold'>Upload Image</p>
        <div className='flex gap-4'>
          {[image1, image2, image3, image4].map((img, idx) => (
            <label
              key={idx}
              htmlFor={`image${idx}`}
              className='w-24 h-24 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition relative border border-gray-300'
            >
              {imagePreviews[idx] ? (
                <img
                  src={imagePreviews[idx]!}
                  alt={`Preview ${idx + 1}`}
                  className='w-full h-full object-cover rounded-lg'
                />
              ) : (
                <div className='flex flex-col items-center justify-center'>
                  <CloudUpload className='w-8 h-8 text-gray-400 mx-auto' />
                  <span className='text-xs mt-2 text-gray-500'>upload</span>
                </div>
              )}
              <input
                type='file'
                id={`image${idx}`}
                hidden
                accept='image/*'
                onChange={e => handleImageChange(idx, e)}
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write Content Here"
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select
            className='w-full px-3 py-2'
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Sub Category</p>
          <select
            className='w-full px-3 py-2'
            value={subCategory}
            onChange={e => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input
            className='w-full p-3 py-2 sm:w-[120px]'
            type='number'
            placeholder='100'
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {SIZES.map(size => (
            <button
              type="button"
              key={size}
              className={`bg-slate-200 px-3 py-1 rounded cursor-pointer ${sizes.includes(size) ? 'bg-slate-800 text-white' : ''}`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div className='gap-2 mt-2 flex items-center'>
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={e => setBestseller(e.target.checked)}
        />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>
      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white rounded-lg'>ADD</button>
    </form>
  );
};

export default Add;
