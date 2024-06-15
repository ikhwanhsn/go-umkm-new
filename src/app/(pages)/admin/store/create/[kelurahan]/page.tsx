"use client";

import { useSession } from "next-auth/react";
import { useRef, useState, useEffect } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "@/services/firebase/firebase";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const CreateStore = () => {
  const { kelurahan } = useParams();
  const router = useRouter();
  const [storeName, setStoreName] = useState("");
  const [storeDesc, setStoreDesc] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [alamat, setAlamat] = useState("");
  const [nib, setNib] = useState("");
  const [noTelp, setNoTelp] = useState("");

  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/go-umkm-9915e.appspot.com/o/default%2Fdefault-toko.png?alt=media&token=b5d4b965-99d0-4a13-85b0-09132333fc2a"; // Replace this with the actual URL

  useEffect(() => {
    setImagePreview(defaultImageUrl);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setIsImageUploaded(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setIsImageUploaded(false);
    setImagePreview(defaultImageUrl);
    if (ref.current) {
      ref.current.value = "";
    }
  };

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
          `images/store/${Math.floor(Math.random() * 1000000)}/${image.name}`
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
          kelurahan: "barusari",
          alamat: alamat,
          nib: nib,
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
            Tambah Toko ({kelurahan})
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
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-32 h-32 object-cover"
                />
                {isImageUploaded && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="btn btn-error btn-outline mt-2"
                  >
                    Hapus Gambar
                  </button>
                )}
              </div>
            )}
            <input
              type="file"
              name="file"
              ref={ref}
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/jpg"
              className="file-input file-input-bordered w-full max-w-xs bg-gray-50 mt-3"
            />
          </section>
          <p className="text-left mt-3">Deskripsi :</p>
          <textarea
            placeholder="Deskripsi..."
            maxLength={700}
            rows={4}
            value={storeDesc}
            onChange={(e) => setStoreDesc(e.target.value)}
            required
            className="w-full bg-gray-50 textarea textarea-bordered text-base mt-3"
          ></textarea>
          <br />
          <p className="text-left mt-2">Kelurahan :</p>
          <input
            type="text"
            placeholder="Kelurahan..."
            id="kelurahan"
            value={kelurahan}
            readOnly
            className="input input-bordered w-full bg-gray-50 mt-2"
          />
          <p className="text-left mt-3">Alamat :</p>
          <input
            type="text"
            placeholder="Alamat..."
            id="alamat"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            className="input input-bordered w-full bg-gray-50 mt-2"
          />
          <p className="text-left mt-3">NIB :</p>
          <input
            type="text"
            placeholder="NIB..."
            id="nib"
            value={nib}
            onChange={(e) => setNib(e.target.value)}
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
