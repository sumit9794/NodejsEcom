const Category = require("../models/Category");

// Create Category 
const createCategory = async (req, res) => {
  try {
    const {name,slug,description,image,isActive} = req.body || {};

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Name and slug are required",
      });
    }

    const category = await Category.create({
      name,
      slug: slug.toLowerCase().trim(),
      description,
      image,
      isActive,
    });

    return res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
        isActive: category.isActive,
      },
    });
  } catch (error) {
    console.error("Category creation error:", error.message);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Category name or slug already exists",
      });
    }
    if (error.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Categories
const getCategories = async(req,res) => {
    try{
        const category = await Category.find();
        return res.status(200).json({
            success : true,
            data : category
        });
    }catch(error){
        res.status(500).json({
            messgae: error.messgae,
            success : false
        });
    }
}

// Get Only One Category
const getCategoryById = async(req,res) => {
    try{
        const { id } = req.params;
        const category = await Category.findById(id);

        if(!category){
          return res.status(404).json({
            success : false,
            message : "Category Not Found"
          })
        }
        return res.status(200).json({
            success : true,
            data : category
        });

    }catch(error){
        res.status(500).json({
            messgae: error.messgae,
            success : false
        });
    }
}

// Update Category
const updateCategory = async(req,res) => {
    try{
        const { id } = req.params;

        const {name,description,slug,image,isActive} = req.body;
        
        const category = await Category.findByIdAndUpdate(
          id,{name,description,slug,image,isActive},{
            new: true,
            runValidators: true,
          }
        );

        if(!category){
          return res.status(404).json({ 
            success : false,
            message : "Category Not Found"
          })
        }
        return res.status(200).json({
          success: true,
          message: "Category Updated successfully",
          data: category,
        });

    }catch(error){
        res.status(500).json({
            messgae: error.messgae,
            success : false
        });
    }
}

// Delete Category
const deleteCategory = async(req,res) => {
    try{
        const { id } = req.params;
        
        const category = await Category.findByIdAndDelete(id);

        if(!category){
          return res.status(404).json({ 
            success : false,
            message : "Category Not Found"
          })
        }
        return res.status(200).json({
          success: true,
          message: "Category deleted successfully",
          data: category,
        });

    }catch(error){
        res.status(500).json({
            messgae: error.messgae,
            success : false
        });
    }
}

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };