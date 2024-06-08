import Message from "@/models/chat";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  try {
    const { email, content } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    // Membuat pesan baru
    const newMessage = new Message({
      sender: user?._id,
      content,
    });

    // Menyimpan pesan ke database
    await newMessage.save();

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil disimpan",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" });
  }
}

export async function GET(request: any) {
  try {
    const messages = await Message.find();
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" });
  }
}

export async function DELETE(request: any) {
  try {
    const { id } = await request.json();
    await Message.deleteOne({ _id: id });
    return NextResponse.json({ success: true, message: "Pesan dihapus" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" });
  }
}

export async function PUT(request: any) {
  try {
    const { id, content } = await request.json();
    await Message.updateOne({ _id: id }, { content });
    return NextResponse.json({ success: true, message: "Pesan diupdate" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" });
  }
}
