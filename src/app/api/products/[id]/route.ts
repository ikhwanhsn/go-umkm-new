import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import User from "@/models/user";
import { storage } from "@/services/firebase/firebase";
import { deleteObject, ref } from "firebase/storage";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: any) {
  try {
    const { id } = params;
    const {
      email,
      NewName: name,
      NewDescription: description,
      NewPrice: price,
      NewImage: image,
      NewLink: link,
      NewCategory: category,
    } = await request.json();
    const user = await User.findOne({ email });
    await connectMongoDB();
    const updated = await Product.findByIdAndUpdate(id, {
      user_id: user?._id,
      name,
      description,
      price,
      image,
      link,
      category,
    });
    if (updated) {
      return NextResponse.json({ message: "Product updated" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Failed to updated product" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request: Request, { params }: any) {
  try {
    const { email, id } = params;
    await connectMongoDB();
    if (!id) {
      const user = await User.findOne({ email });
      const product = await Product.find({ user_id: user?.id });
      if (product) {
        return NextResponse.json({ product }, { status: 200 });
      } else {
        return NextResponse.json(
          {
            message: "Product not found",
          },
          { status: 404 }
        );
      }
    }
    if (!email) {
      const product = await Product.findById(id);
      if (product) {
        return NextResponse.json({ product }, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// export async function DELETE(request: Request, { params }: any) {
//   try {
//     const { id } = params;
//     await connectMongoDB();
//     const deleted = await Product.findByIdAndDelete(id);
//     if (deleted) {
//       return NextResponse.json({ message: "Product deleted" }, { status: 200 });
//     } else {
//       return NextResponse.json(
//         { message: "Product not found" },
//         { status: 404 }
//       );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
export async function DELETE(request: Request, { params }: any) {
  try {
    const { id, email } = await request.json();

    await connectMongoDB();
    const idUser = await User.findOne({ email });

    if (!idUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const product = await Product.findOne({
      _id: id,
      user_id: idUser.id,
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Hapus gambar dari Firebase Storage
    const imageUrl = product.image;
    const decodedUrl = decodeURIComponent(
      imageUrl.split("/o/")[1].split("?")[0]
    );
    const imageRef = ref(storage, decodedUrl);
    await deleteObject(imageRef);

    // Hapus produk dari MongoDB
    await Product.deleteOne({ _id: id, user_id: idUser.id });

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
