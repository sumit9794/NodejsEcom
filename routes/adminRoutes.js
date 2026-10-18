const express = require("express");
const router = express.Router();

const {registerAdmin, getAdmin, adminLogin} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

//Public Route
router.post("/register", registerAdmin);
router.post("/login", adminLogin);
//Protected Route
router.get("/", authMiddleware, getAdmin);

module.exports = router;