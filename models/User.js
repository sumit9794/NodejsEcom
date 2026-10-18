const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Use the existing collection: admin_users
const AdminUser = mongoose.model(
  "AdminUser",
  adminUserSchema,
  "admin_users"
);

module.exports = AdminUser;