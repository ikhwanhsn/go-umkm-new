import connectMongoDB from "@/libs/mongodb";
import Store from "@/models/store";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name, description, image, telephone } = await request.json();
    const idUser = await User.findOne({ email: email });
    if (!idUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    await connectMongoDB();
    const added = await Store.create({
      user_id: idUser.id,
      name,
      description,
      image,
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
    const stores = await Store.find().limit(limit);
    if (stores.length > 0) {
      return NextResponse.json(stores);
    } else {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
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
