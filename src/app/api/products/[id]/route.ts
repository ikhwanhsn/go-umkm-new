import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: any) {
  try {
    const { id } = params;
    const {
      user_id,
      NewName: name,
      NewDescription: description,
      NewPrice: price,
      NewImage: image,
      NewLink: link,
      NewCategory: category,
    } = await request.json();
    await connectMongoDB();
    const updated = await Product.findByIdAndUpdate(id, {
      user_id,
      name,
      description,
      price,
      image,
      link,
      category,
    });
    if (updated) {
      return NextResponse.json({ message: "Product updated" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Failed to updated product" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request: Request, { params }: any) {
  try {
    const { id } = params;
    await connectMongoDB();
    const product = await Product.findOne({ _id: id });
    if (product) {
      return NextResponse.json({ product }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: Request, { params }: any) {
  try {
    const { id } = params;
    await connectMongoDB();
    const deleted = await Product.findByIdAndDelete(id);
    if (deleted) {
      return NextResponse.json({ message: "Product deleted" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
