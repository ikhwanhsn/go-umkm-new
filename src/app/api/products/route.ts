import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import User from "@/models/user";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name, description, image, price, link, category } =
      await request.json();
    const idUser = await User.findOne({ email: email });
    const amountProduct = await Product.find({ user_id: idUser?.id });

    if (amountProduct.length >= 5) {
      return NextResponse.json(
        { message: "Product limit reached 5 products" },
        { status: 400 }
      );
    }

    if (!idUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await connectMongoDB();
    const added = await Product.create({
      user_id: idUser.id,
      name,
      description,
      image,
      price,
      link,
      category,
    });
    if (added) {
      return NextResponse.json(
        { message: "New product has been added!" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to added product" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request: any) {
  try {
    await connectMongoDB();
    const { nextUrl } = request;
    const limit = nextUrl.searchParams.get("limit");
    const products = await Product.find().limit(limit);
    if (products.length > 0) {
      return NextResponse.json(products);
    } else {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: any) {
  try {
    const id = request.nextUrl.searchParams.get("id");
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