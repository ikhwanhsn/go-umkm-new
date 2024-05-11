import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    user_id: String,
    name: String,
    description: String,
    price: String,
    image: String,
    category: String,
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
