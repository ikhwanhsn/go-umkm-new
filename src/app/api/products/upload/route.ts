import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
  };

  // Inisialisasi Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // Upload gambar ke Firebase Storage
  const storageRef = firebase.storage().ref("images/products/1/" + file.name);
  const uploadTask = storageRef.put(file);

  // Menangani status perubahan unggahan
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log(
        "Progress:",
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + "%"
      );
    },
    (error) => {
      console.error("Error:", error);
    },
    () => {
      // Unggahan selesai, dapatkan URL unduhan dan tampilkan di konsol
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        console.log("File uploaded successfully. URL:", url);
        return NextResponse.json({ success: true, url: url });
      });
    }
  );

  return NextResponse.json({ success: true });
}
