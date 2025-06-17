import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { IoIosArrowDropdown } from 'react-icons/io';
import Title from '../components/Title';
import type { Product } from '../interfaces/ShopContext.interface';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { myProducts } = useContext(ShopContext)!;

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('relevant');

  // Toggle category checkbox
  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Toggle sub-category checkbox
  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Filtering & Sorting
  useEffect(() => {
    let filtered = [...myProducts];

    // Category filter
    if (category.length > 0) {
      filtered = filtered.filter((product) => category.includes(product.category.trim()));
    }

    // Sub-category filter
    if (subCategory.length > 0) {
      filtered = filtered.filter((product) =>
        subCategory.includes(product.subCategory.trim())
      );
    }

    // Sorting
    if (sortBy === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filtered);
  }, [myProducts, category, subCategory, sortBy]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Sidebar */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <IoIosArrowDropdown
            className={`text-2xl sm:hidden transition-transform duration-200 ${
              showFilter ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer">
              <input
                type="checkbox"
                value="Men"
                checked={category.includes('Men')}
                onChange={toggleCategory}
              />
              Men
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input
                type="checkbox"
                value="Women"
                checked={category.includes('Women')}
                onChange={toggleCategory}
              />
              Women
            </label>
          </div>
        </div>

        {/* Sub-Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-5 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer">
              <input
                type="checkbox"
                value="TopWear"
                checked={subCategory.includes('TopWear')}
                onChange={toggleSubCategory}
              />
              TopWear
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input
                type="checkbox"
                value="BottomWear"
                checked={subCategory.includes('BottomWear')}
                onChange={toggleSubCategory}
              />
              BottomWear
            </label>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL " text2="COLLECTIONS" />
          <select
            title="Sort products"
            className="border-2 border-gray-300 text-sm px-2 py-1 rounded"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm col-span-full">No matching products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
