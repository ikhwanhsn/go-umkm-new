"use client";

import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "@/services/firebase/firebase";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

const CreateStore = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, status: session } = useSession();
  const [storeName, setStoreName] = useState("");
  const [storeDesc, setStoreDesc] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [noTelp, setNoTelp] = useState("");

  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/go-umkm-9915e.appspot.com/o/default%2Fdefault-toko.png?alt=media&token=b5d4b965-99d0-4a13-85b0-09132333fc2a"; // Replace this with the actual URL

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imageUrl = defaultImageUrl; // Use default image URL by default

    if (image) {
      if (image.size > 1048576) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ukuran foto terlalu besar. Maksimal 1 MB!",
        });
        return;
      }
      try {
        // Upload image to Firebase Storage
        const storageReference = storageRef(
          storage,
          `images/store/${data?.user?.email}/${image.name}`
        );
        await uploadBytes(storageReference, image);
        imageUrl = await getDownloadURL(storageReference); // Use uploaded image URL
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Kesalahan saat mengunggah gambar!",
        });
        return;
      }
    }

    try {
      // Save store data to MongoDB
      const res = await fetch("/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: storeName,
          description: storeDesc,
          image: imageUrl, // Use the appropriate image URL
          kecamatan: "barusari",
          telephone: noTelp,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      ref.current && (ref.current.value = "");
      await Swal.fire({
        title: "Success!",
        text: "Toko berhasil ditambahkan!",
        icon: "success",
      });
      await router.refresh();
      await router.push("/admin/barusari");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Toko gagal ditambahkan!",
      });
    }
  };

  return (
    <main className="w-full min-h-screen">
      <section className="lg:w-1/2 md:w-3/4 w-full md:mx-auto md:px-0 px-5 text-center">
        <form onSubmit={submit}>
          <h1 className="mt-5 text-xl text-orange-500 font-bold capitalize">
            Edit Toko
          </h1>
          <p className="text-left mt-12">Nama Toko :</p>
          <input
            type="text"
            placeholder="Nama toko..."
            id="nama"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
            className="input input-bordered w-full bg-gray-50 mt-2"
          />
          <br />
          <section className="text-left">
            <p className="text-left mt-3">Logo Toko :</p>
            <input
              type="file"
              name="file"
              ref={ref}
              onChange={(e: any) => setImage(e.target.files?.[0])}
              accept="image/png, image/jpeg, image/jpg"
              className="file-input file-input-bordered w-full max-w-xs bg-gray-50 mt-3"
            />
          </section>
          <p className="text-left mt-3">Deskripsi :</p>
          <textarea
            placeholder="Deskripsi..."
            maxLength={300}
            rows={4}
            value={storeDesc}
            onChange={(e) => setStoreDesc(e.target.value)}
            required
            className="w-full bg-gray-50 textarea textarea-bordered text-base mt-3"
          ></textarea>
          <br />
          <p className="text-left mt-2">Kecamatan :</p>
          <input
            type="text"
            placeholder="Kecamatan..."
            id="kecamatan"
            value={"barusari"}
            readOnly
            className="input input-bordered w-full bg-gray-50 mt-2"
          />
          <p className="text-left mt-3">No Telp :</p>
          <input
            type="text"
            placeholder="Nomor telephone..."
            id="telp"
            value={noTelp}
            onChange={(e) => setNoTelp(e.target.value)}
            required
            className="input input-bordered w-full bg-gray-50 mt-2"
          />
          <br />
          <section className="space-x-2">
            <button
              className="btn bg-orange-500 text-white border-none hover:bg-orange-600 mt-5"
              type="submit"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white mt-5"
            >
              Batal
            </button>
          </section>
        </form>
      </section>
    </main>
  );
};

export default CreateStore;
