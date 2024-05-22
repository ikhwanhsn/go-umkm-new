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
