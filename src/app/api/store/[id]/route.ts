import connectMongoDB from "@/libs/mongodb";
import Store from "@/models/store";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: any) {
  try {
    const {
      email,
      NewName: name,
      NewDescription: description,
      NewImage: image,
      NewProvince: province,
      NewCity: city,
      NewKecamatan: kecamatan,
      NewTelephone: telephone,
    } = await request.json();
    await connectMongoDB();
    const idUser = await User.findOne({ email });
    const updated = await Store.findOneAndUpdate(
      { user_id: idUser?.id },
      {
        user_id: idUser?.id,
        name,
        description,
        image,
        province,
        city,
        kecamatan,
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

export async function GET(request: Request, { params }: any) {
  try {
    const { email } = params;
    await connectMongoDB();
    const user = await User.findOne({ email });
    const store = await Store.findOne({ user_id: user?.id });
    if (store) {
      return NextResponse.json({ store }, { status: 200 });
    } else {
      return NextResponse.json([]);
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
