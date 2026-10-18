const express = require("express");

const router = express.Router();

const { 
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Create product (authentication required)
router.post("/create", authMiddleware, createProduct);
router.get("/", authMiddleware, getAllProducts);
router.get("/:id", authMiddleware, getProductById);
router.put("/update/:id", authMiddleware, updateProduct);
router.delete("/delete/:id", authMiddleware, deleteProduct);


module.exports = router;