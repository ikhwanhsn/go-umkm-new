import connectMongoDB from "@/libs/mongodb";
import Favorite from "@/models/favorite";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request: any, { params }: any) {
  try {
    await connectMongoDB();
    const { id } = params;
    const { nextUrl } = request;
    const email = nextUrl.searchParams.get("email");
    const user = await User.findOne({ email });
    const favorite = await Favorite.find({
      product_id: id,
      user_id: user?._id,
    }); // Menggunakan 'email' untuk mencocokkan favorit dengan produk_id dan user_email
    if (favorite.length > 0) {
      return NextResponse.json(favorite);
    } else {
      return NextResponse.json([]);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: any, { params }: any) {
  try {
    const { id } = params;
    await connectMongoDB();
    const deleted = await Favorite.findOneAndDelete({ product_id: id });
    if (deleted) {
      return NextResponse.json(
        { message: "Favorite product deleted" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Favorite product not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
