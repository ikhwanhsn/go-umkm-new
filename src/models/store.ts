import mongoose, { Schema } from "mongoose";

const storeSchema = new Schema(
  {
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
    kelurahan: {
      type: String,
      enum: ["barusari", "bulustalan"],
      default: "barusari",
    },
    telephone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

export default Store;
