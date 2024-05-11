import mongoose, { Schema } from "mongoose";

const favoriteSchema = new Schema(
  {
    user_id: String,
    product_id: String,
  },
  {
    timestamps: true,
  }
);

const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);

export default Favorite;
