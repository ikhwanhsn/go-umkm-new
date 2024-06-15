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
      max: 700,
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
    alamat: {
      type: String,
      required: true,
    },
    nib: {
      type: String,
      required: true,
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
