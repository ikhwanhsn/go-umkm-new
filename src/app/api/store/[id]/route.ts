import connectMongoDB from "@/libs/mongodb";
import Store from "@/models/store";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: any) {
  try {
    const { id } = params;
    const {
      user_id,
      NewName: name,
      NewDescription: description,
      NewImage: image,
      NewTelephone: telephone,
    } = await request.json();
    await connectMongoDB();
    const updated = await Store.findByIdAndUpdate(id, {
      user_id,
      name,
      description,
      image,
      telephone,
    });
    if (updated) {
      return NextResponse.json({ message: "Store updated" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Failed to updated store" },
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
    const store = await Store.findOne({ _id: id });
    if (store) {
      return NextResponse.json({ store }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: Request, { params }: any) {
  try {
    const { id } = params;
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
