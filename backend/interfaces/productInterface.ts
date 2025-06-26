import { Document } from "mongoose";

// This interface extends mongoose Document for typing with mongoose models
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string[];         // Adjust to object[] if storing image objects
  category: string;
  subCategory: string;
  sizes: string[];
  bestseller: boolean;
  date: number;            // Date is used if preferred
}
