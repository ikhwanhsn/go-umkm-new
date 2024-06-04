import connectMongoDB from "@/libs/mongodb";
import Store from "@/models/store";
import { NextResponse } from "next/server";

// export async function GET(request: any, { params }: any) {
//   try {
//     await connectMongoDB();
//     const { kelurahan } = params;
//     //   const { nextUrl } = request;
//     //   const limit = nextUrl.searchParams.get("limit");
//     //   const stores = await Store.find().limit(limit);
//     const stores = await Store.find({ kelurahan: kelurahan });
//     if (stores.length > 0) {
//       return NextResponse.json(stores);
//     } else {
//       return NextResponse.json([]);
//     }
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request: any, { params }: any) {
  try {
    await connectMongoDB();
    const { kelurahan } = params;

    const stores = await Store.aggregate([
      { $match: { kelurahan: kelurahan } },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "store_id",
          as: "products",
        },
      },
      {
        $project: {
          name: 1,
          kelurahan: 1,
          totalProduct: { $size: "$products" },
        },
      },
    ]);

    return NextResponse.json(stores);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
