import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import Store from "@/models/store";
import User from "@/models/user";
import { storage } from "@/services/firebase/firebase";
import { deleteObject, ref } from "firebase/storage";
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
    const store = await Store.findOne({ user_id: user?._id });
    if (store) {
      return NextResponse.json({ store }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }
}

// export async function DELETE(request: Request, { params }: any) {
//   try {
//     const { id } = params;
//     await connectMongoDB();
//     const deleted = await Store.findByIdAndDelete(id);
//     if (deleted) {
//       return NextResponse.json({ message: "Store deleted" }, { status: 200 });
//     } else {
//       return NextResponse.json({ message: "Store not found" }, { status: 404 });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function DELETE(request: Request, { params }: any) {
  try {
    const { storeId, email } = await request.json();

    await connectMongoDB();
    const idUser = await User.findOne({ email });

    if (!idUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const store = await Store.findOne({ _id: storeId, user_id: idUser.id });

    if (!store) {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }

    // Temukan semua produk terkait
    const products = await Product.find({ user_id: idUser.id });

    // Hapus gambar produk dari Firebase Storage
    for (const product of products) {
      const imageUrl = product.image;
      const decodedUrl = decodeURIComponent(
        imageUrl.split("/o/")[1].split("?")[0]
      );
      const imageRef = ref(storage, decodedUrl);
      await deleteObject(imageRef);
    }

    // Hapus semua produk terkait dari MongoDB
    await Product.deleteMany({ user_id: idUser.id });

    // Hapus toko dari MongoDB
    await Store.deleteOne({ _id: storeId, user_id: idUser.id });

    return NextResponse.json(
      { message: "Store and associated products deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
