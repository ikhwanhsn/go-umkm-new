import connectMongoDB from "@/libs/mongodb";
import Store from "@/models/store";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, description, image, kelurahan, telephone } =
      await request.json();
    // const idUser = await User.findOne({ email: email });
    // const storeExists = await Store.findOne({ user_id: idUser.id });

    // if (storeExists) {
    //   return NextResponse.json(
    //     { message: "Store already exists" },
    //     { status: 400 }
    //   );
    // }

    // if (!idUser) {
    //   return NextResponse.json({ message: "User not found" }, { status: 404 });
    // }

    await connectMongoDB();
    const added = await Store.create({
      name,
      description,
      image,
      kelurahan,
      telephone,
    });
    if (added) {
      return NextResponse.json(
        { message: "New store has been added!" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to added store" },
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
    const kelurahan = nextUrl.searchParams.get("kelurahan");
    const stores = await Store.find({ kelurahan: kelurahan }).limit(limit);
    if (stores.length > 0) {
      return NextResponse.json(stores);
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
    const deleted = await Store.findByIdAndDelete(id);
    if (deleted) {
      return NextResponse.json({ message: "Store deleted" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }
}
