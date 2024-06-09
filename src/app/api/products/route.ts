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

    if (amountProduct.length >= 10) {
      return NextResponse.json(
        { message: "Maksimal 10 produk di setiap toko" },
        { status: 400 }
      );
    }

    if (!store) {
      return NextResponse.json(
        { message: "Toko tidak ditemukan" },
        { status: 404 }
      );
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
        { message: "Produk ditambahkan!" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Produk gagal ditambahkan" },
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
    const search = nextUrl.searchParams.get("search") || "";
    const limit = parseInt(url.searchParams.get("limit") || "50", 10);

    // Dapatkan semua data toko dari koleksi Store
    const stores = await Store.find({ kelurahan: kelurahan });

    if (stores.length === 0) {
      return NextResponse.json([]);
    }

    // Ambil id dan nama toko yang memiliki kelurahan sesuai
    const storeMap = new Map();
    stores.forEach((store) => {
      storeMap.set(store._id.toString(), store.name);
    });

    const storeIds = Array.from(storeMap.keys());

    // Dapatkan semua data produk dari koleksi Product dan filter berdasarkan search term
    const products = await Product.find({
      store_id: { $in: storeIds },
      name: { $regex: search, $options: "i" }, // Menggunakan regex untuk pencarian case-insensitive
    }).limit(limit);

    // Gabungkan data produk dengan nama toko
    const productsWithStoreName: any = products.map((product) => ({
      ...product.toObject(),
      storeName: storeMap.get(product.store_id.toString()),
    }));

    return NextResponse.json(productsWithStoreName);
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
