const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      image,
      isActive
    } = req.body;

    // Validate required fields
    if (
      !name ||
      price === undefined ||
      price === null ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and category are required"
      });
    }

    // Validate category ID format
    if (!mongoose.isValidObjectId(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID"
      });
    }

    // Check whether category exists
    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image,
      isActive
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: product
    });

  } catch (error) {
    console.error("Create product error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


// GET ALL PRODUCTS
const getAllProducts = async(req,res)  => {       
    try{
        const products = await Product.find();

        return res.status(201).json({
            success:true,
            count: products.length,
            data : products
        })

    }catch(error){
         return res.status(500).json({
            success:false,
            message : "Internal Server Error"
        })

    }
}

// GET PRODUCT BY ID
const getProductById = async(req,res)  => {       
    try{
        const { id } = req.params;

        const products = await Product.findById(id);

        if(!products){
            return res.status(404).json({
               success : false,
               message : "Product Not Found"
            })
        }

        return res.status(201).json({
            success:true,
            data : products
        })

    }catch(error){
         return res.status(500).json({
            success:false,
            message : "Internal Server Error"
        })

    }
}

// UPDATE PRODUCT BY ID
const updateProduct = async(req,res)  => {       
    try{
        const { id } = req.params;
        
        const { name,description,price,stock,category,image,isActive } = req.body;

        const products = await Product.findByIdAndUpdate(id,
            {name,description,price,stock,category,image,isActive},
            {new: true, runValidators : true});

        if(!products){
            return res.status(404).json({
               success : false,
               message : "Product Not Found"
            })
        }

        return res.status(201).json({
            success:true,
            data : products
        })

    }catch(error){
         return res.status(500).json({
            success:false,
            message : "Internal Server Error"
        })

    }
}

// DELETE PRODUCT BY ID
const deleteProduct = async(req,res)  => {       
    try{
        const { id } = req.params;
        const products = await Product.findByIdAndDelete(id);

        if(!products){
            return res.status(404).json({
               success : false,
               message : "Product Not Found"
            })
        }

        return res.status(201).json({
            success:true,
            message: "Product deleted successfully",
            data : products
        })

    }catch(error){
         return res.status(500).json({
            success:false,
            message : "Internal Server Error"
        })

    }
}

module.exports = {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct};