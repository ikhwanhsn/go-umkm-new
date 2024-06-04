import connectMongoDB from "@/libs/mongodb";
import Store from "@/models/store";
import { NextResponse } from "next/server";

export async function GET(request: any, { params }: any) {
  try {
    const { id } = params;
    await connectMongoDB();
    const stores = await Store.find({ _id: id });
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

export async function PUT(request: Request, { params }: any) {
  try {
    const {
      id,
      NewName: name,
      NewDescription: description,
      NewImage: image,
      NewKelurahan: kelurahan,
      NewTelephone: telephone,
    } = await request.json();
    await connectMongoDB();
    const updated = await Store.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
        image,
        kelurahan,
        telephone,
      }
    );
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
