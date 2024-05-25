import connectMongoDB from "@/libs/mongodb";
import Favorite from "@/models/favorite";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, product_id } = await request.json();
    const idUser = await User.findOne({ email: email });
    if (!idUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    await connectMongoDB();
    const added = await Favorite.create({
      user_id: idUser._id,
      product_id,
    });
    if (added) {
      return NextResponse.json(
        { message: "New favorite product has been added!" },
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
    const email = nextUrl.searchParams.get("email");
    const limit = nextUrl.searchParams.get("limit");
    const favorite = await Favorite.find({ email: email }).limit(limit);
    if (favorite.length > 0) {
      return NextResponse.json(favorite);
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

// export async function GET(request: any) {
//   try {
//     await connectMongoDB();
//     const { nextUrl } = request;
//     const email = nextUrl.searchParams.get("email");
//     const limit = parseInt(nextUrl.searchParams.get("limit"), 10) || 10; // Default limit to 10 if not specified

//     const favorites = await Favorite.aggregate([
//       {
//         $addFields: {
//           product_id: { $toObjectId: "$product_id" }, // Convert product_id to ObjectId
//         },
//       },
//       {
//         $lookup: {
//           from: "products", // The collection name for products
//           localField: "product_id", // The field in the favorites collection to join on
//           foreignField: "_id", // The field in the products collection to join on
//           as: "productDetails",
//         },
//       },
//       {
//         $unwind: "$product_info", // Unwind to denormalize the array
//       },
//       {
//         $limit: limit,
//       },
//     ]);

//     if (favorites.length > 0) {
//       return NextResponse.json(favorites);
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

export async function DELETE(request: any) {
  try {
    const { nextUrl } = request;
    const id = nextUrl.searchParams.get("id");
    await connectMongoDB();
    const deleted = await Favorite.findOneAndDelete({ product_id: id });
    if (deleted) {
      return NextResponse.json(
        { message: "Favorite product deleted" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Favorite product not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
