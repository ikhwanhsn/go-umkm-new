import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  try {
    const { email } = params;
    await connectMongoDB();
    const user = await User.findOne({ email });
    const product = await Product.find({ user_id: user?._id });
    if (product) {
      return NextResponse.json({ product }, { status: 200 });
    } else {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
