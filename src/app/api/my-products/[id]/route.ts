import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import Store from "@/models/store";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  try {
    const { id } = params;
    await connectMongoDB();
    const store = await Store.findOne({ _id: id });
    const product = await Product.find({ store_id: store?._id });
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
