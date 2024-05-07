import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: any) {
  try {
    const { email } = params;
    const { name, role } = await request.json();
    await connectMongoDB();
    const updated = await User.findOneAndUpdate(
      { email },
      {
        name,
        role,
      }
    );
    if (updated) {
      return NextResponse.json({ message: "User updated" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Failed to updated" },
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
    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: Request, { params }: any) {
  try {
    const { email } = params;
    await connectMongoDB();
    const deleted = await User.findOneAndDelete({ email });
    if (deleted) {
      return NextResponse.json({ message: "User deleted" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }
}
