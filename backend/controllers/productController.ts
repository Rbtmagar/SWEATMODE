import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from 'cloudinary';
import productModel from "../models/productModel";
// function for add product

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const image1 = files?.image1?.[0];
        const image2 = files?.image2?.[0];
        const image3 = files?.image3?.[0];
        const image4 = files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        let imagesUrl = await Promise.all(
          images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
            return result.secure_url
          })
        )

        // console.log(name, description, price, category, subCategory, sizes, bestseller);
        // console.log("Images:", images);
        // console.log(imagesUrl)

        const productData = {
          name,
          description,
          category,
          price: Number(price),
          subCategory,
          bestseller: bestseller === "true" ? true : false,
          sizes:JSON.parse(sizes),
          image: imagesUrl,
          date: Date.now()
        }

        // console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({
            success: true,
            data: {
                name,
                description,
                price,
                category,
                subCategory,
                sizes,
                bestseller,
                images: images.map(img => img?.filename)
            },
            message:"Product Added"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: (error instanceof Error ? error.message : "Internal server error"),
        });
    }
};



// function for list products

export const listProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const products = await productModel.find({});
    res.status(200).json({success:true,products})

  } catch (error) {
    console.error(error);
        res.status(500).json({
            success: false,
            message: (error instanceof Error ? error.message : "Internal server error"),
        });
  }

};

// function for removing product by ID
export const removingProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
      return;
    }

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Product removed",
      // deletedProduct,
    });

  } catch (error) {
    console.error(error);
        res.status(500).json({
            success: false,
            message: (error instanceof Error ? error.message : "Internal server error"),
        });
  }

};

// function for single product info

export const productInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
      return;
    }

    const product = await productModel.findById(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    console.error("Error in productInfo:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};
