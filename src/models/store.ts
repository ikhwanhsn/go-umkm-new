import mongoose, { Schema } from "mongoose";

const storeSchema = new Schema(
  {
    user_id: String,
    name: String,
    description: String,
    image: String,
    telephone: Number,
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

export default Store;
