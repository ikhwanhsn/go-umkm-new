import mongoose, { Schema } from "mongoose";

const storeSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      max: 1000,
    },
    image: {
      type: String,
      required: true,
    },
    telephone: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

export default Store;
