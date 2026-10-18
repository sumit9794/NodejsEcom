const express = require("express");

const router = express.Router();

const {createCategory,
   getCategories,
   getCategoryById,
   updateCategory,
   deleteCategory 
 } = require("../controllers/categoryController"); 

const authMiddleware =require("../middleware/authMiddleware");  

router.post("/create", authMiddleware, createCategory);
router.get("/", authMiddleware, getCategories);
router.get("/:id", authMiddleware, getCategoryById);
router.put("/update/:id", authMiddleware, updateCategory);
router.delete("/delete/:id", authMiddleware, deleteCategory);
 
module.exports = router;