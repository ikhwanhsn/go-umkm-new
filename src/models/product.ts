import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    // user_id: {
    //   type: String,
    //   required: true,
    // },
    store_id: {
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
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    link: {
      type: String,
    },
    category: {
      type: String,
      enum: [
        "Fashion",
        "Makanan dan Minuman",
        "Kesehatan dan Kecantikan",
        "Perhiasan",
        "Perabotan Rumah Tangga",
        "Alat Tulis Kantor",
        "Elektronik dan Gadget",
        "Otomotif",
        "Olahraga dan Aktivitas Luar Ruangan",
        "Karya Seni dan Kerajinan Tangan",
        "Lainnya",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
