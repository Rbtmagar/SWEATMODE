import logo from './logo.png';
import tshirt1 from './tshirt1.png';
import tshirt2 from './tshirt2.png';
import tshirt3 from './tshirt3.png';
import tshirt4 from './tshirt4.png';
import tshirt5 from './tshirt5.png';
import tshirt11 from './tshirt11.png';
import tshirt12 from './tshirt12.png';
import tshirt13 from './tshirt13.png';
import tshirt14 from './tshirt14.png';
import image from './image.png';
import img from './img.png';
import contact from './contact.png'



export const assets = {
    logo,
    tshirt1,
    tshirt2,
    tshirt3,
    tshirt4,
    tshirt5,
    tshirt11,
    tshirt12,
    tshirt13,
    tshirt14,
    image,
    img,
    contact,
};

export const myProducts = [
   {
    _id: "1",
    name: "Classic T-Shirt",
    description: "Premium cotton white t-shirt for everyday wear.",
    price: 899,
    image: [tshirt1],
    category: "Men",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    date: "2023-01-15",
    bestseller: true
  },
  {
    _id: "2",
    name: "Graphic Tee",
    description: "Trendy white t-shirt with bold front print.",
    price: 1099,
    image: [tshirt2],
    category: "Men",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    date: "2023-03-10",
    bestseller: true
  },
  {
    _id: "3",
    name: "Slim Fit Tee",
    description: "Modern slim fit black t-shirt for gym or casual use.",
    price: 999,
    image: [tshirt3],
    category: "Men",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    date: "2023-06-05",
    bestseller: false
  },
  {
    _id: "4",
    name: "Printed T-Shirt",
    description: "Green t-shirt made with sustainable fabric.",
    price: 849,
    image: [tshirt5],
    category: "Men",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    date: "2023-08-20",
    bestseller: false
  },
    {
    _id: "5",
    name: "Basic T-Shirt",
    description: "Soft maroon t-shirt made with sustainable fabric.",
    price: 849,
    image: [tshirt4],
    category: "Women",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    date: "2023-08-20",
    bestseller: true
  },
  {
    _id: "6",
    name: "Custom T-Shirt",
    description: "Custom I love the Gym gray t-shirt for workouts.",
    price: 950,
    image: [tshirt11],
    category: " Women",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    date: "2023-10-30",
    bestseller: false
  },
  {
    _id: "7",
    name: "Beige Tee",
    description: "Relaxed fit beige tee for a cozy vibe.",
    price: 1199,
    image: [tshirt12],
    category: "Women",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    date: "2024-02-14",
    bestseller: false
  },
  {
    _id: "8",
    name: "Iron Will Gym Tee",
    description: "White gym t-shirt with barbell print.",
    price: 1299,
    image: [tshirt13],
    category: "Women",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    date: "2024-06-15",
    bestseller: true
  },
  {
    _id: "9",
    name: "Lift Like a Girl Tee",
    description: "Gray t-shirt with a motivational slogan 'Stronger Everyday' and dumbbell icon.",
    price: 1049,
    image: [tshirt14],
    category: "Women",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    date: "2024-07-01",
    bestseller: false
  }
];