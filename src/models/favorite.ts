import mongoose, { Schema } from "mongoose";

const favoriteSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);

export default Favorite;
