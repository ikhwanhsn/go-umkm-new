import connectMongoDB from "@/libs/mongodb";
import Favorite from "@/models/favorite";
import Product from "@/models/product";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request: any, { params }: any) {
  try {
    await connectMongoDB();
    const { email } = params;

    // Temukan pengguna berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Temukan favorit pengguna berdasarkan user_id
    const favorites = await Favorite.find({ user_id: user?._id });

    // Inisialisasi array untuk menyimpan detail produk
    const products = [];

    // Loop melalui setiap item favorit
    for (const favorite of favorites) {
      // Temukan produk yang sesuai dengan ID produk dalam setiap item favorit
      const product = await Product.findById(favorite.product_id);
      if (product) {
        // Jika produk ditemukan, tambahkan ke array produk
        products.push(product);
      }
    }

    // Kembalikan respon dengan array produk
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
