import mongoose, { Schema, Model } from "mongoose";
import { IProduct } from "../interfaces/productInterface"; // <-- import the interface

const productSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: [String], required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: [String], required: true },
  bestseller: { type: Boolean, required: true },
  date: { type: Number, required: true },
});

const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;
