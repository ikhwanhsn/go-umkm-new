import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import Store from "@/models/store";
import "firebase/compat/storage";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { store_id, name, description, image, price, link, category } =
      await request.json();
    const store = await Store.findOne({ _id: store_id });
    const amountProduct = await Product.find({ store_id: store?._id });

    if (amountProduct.length >= 5) {
      return NextResponse.json(
        { message: "Product limit reached 5 products" },
        { status: 400 }
      );
    }

    if (!store) {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }

    await connectMongoDB();
    const added = await Product.create({
      store_id: store._id,
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
    const url = new URL(request.url);
    const kelurahan = nextUrl.searchParams.get("kelurahan");
    const limit = parseInt(url.searchParams.get("limit") || "50", 10);

    // Dapatkan semua data toko dari koleksi Store
    const stores = await Store.find({ kelurahan: kelurahan });

    if (stores.length === 0) {
      return NextResponse.json([]);
    }

    // Ambil id toko yang memiliki kelurahan sesuai
    const storeIds = stores.map((store) => store._id);

    // Dapatkan semua data produk dari koleksi Product
    const products = await Product.find({ store_id: { $in: storeIds } }).limit(
      limit
    );

    if (products.length > 0) {
      return NextResponse.json(products);
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
