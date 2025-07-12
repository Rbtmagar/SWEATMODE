import React, { useState, type ChangeEvent } from 'react';
import { CloudUpload } from 'lucide-react'; // Or use any upload icon you like

interface AddProps {
  token: string;
}

const IMAGE_BOXES = 4;

const Add: React.FC<AddProps> = ({ token }) => {
  // Store image preview URLs (null if not set)
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(Array(IMAGE_BOXES).fill(null));

  const handleImageChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newPreviews = [...imagePreviews];
      newPreviews[index] = URL.createObjectURL(file);
      setImagePreviews(newPreviews);
    }
  };

  return (
    <form className='flex flex-col w-full items-start gap-6'>
      <div>
        <p className='mb-2 text-base font-semibold'>Upload Image</p>
        <div className='flex gap-4'>
          {[...Array(IMAGE_BOXES)].map((_, idx) => (
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
                onChange={(e) => handleImageChange(idx, e)}
              />
            </label>
          ))}
        </div>
      </div>
      <div>
        <p>Product name</p>
      </div>
    </form>
  );
};

export default Add;
