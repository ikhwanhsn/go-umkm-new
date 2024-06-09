"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "@/services/firebase/firebase";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { fetcher } from "@/libs/swr/fetcher";
import useSWR from "swr";

const category = [
  "Makanan dan Minuman",
  "Kesehatan dan Kecantikan",
  "Perhiasan",
  "Perabotan Rumah Tangga",
  "Alat Tulis Kantor",
  "Elektronik dan Gadget",
  "Otomotif",
  "Olahraga dan Aktivitas Luar Ruangan",
  "Karya Seni dan Kerajinan Tangan",
  "Lainnya",
];

const AddProduct = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data, status: session } = useSession();
  const [storeName, setStoreName] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [deskripsiProduk, setDeskripsiProduk] = useState("");
  const [hargaProduk, setHargaProduk] = useState("");
  const [kategoriProduk, setKategoriProduk] = useState("Fashion");
  const [linkProduk, setLinkProduk] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const {
    data: dataStore,
    error: errorStore,
    isLoading: isLoadingStore,
  } = useSWR(`/api/store/id/${id}`, fetcher);

  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/go-umkm-9915e.appspot.com/o/default%2Fdefault-product.jpg?alt=media&token=2dcef5bb-f341-445c-9e9d-5b1c40b074e6";

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = defaultImageUrl;

    if (file) {
      if (file.size > 1048576) {
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
          `images/product/${data?.user?.email}/${file.name}`
        );
        await uploadBytes(storageReference, file);
        imageUrl = await getDownloadURL(storageReference);
      } catch (error) {
        console.error(error);
        return;
      }
    }

    try {
      // Save product data to MongoDB
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          store_id: id,
          name: namaProduk,
          description: deskripsiProduk,
          image: imageUrl,
          price: hargaProduk,
          link: linkProduk,
          category: kategoriProduk,
        }),
      });

      if (!res.ok) {
        // alert(await res.text());
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: await res.text(),
        });
        return;
      }

      ref.current && (ref.current.value = "");
      await Swal.fire({
        title: "Success!",
        text: "Produk berhasil ditambahkan!",
        icon: "success",
      });
      await router.back();
      await router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (dataStore) {
      const data = dataStore[0];
      setStoreName(data.name);
    }
  }, [dataStore]);

  return (
    <main className="w-full min-h-screen">
      <section className="lg:w-1/2 md:w-3/4 w-full md:px-0 px-5 mx-auto text-center">
        <form onSubmit={submit}>
          <h1 className="mt-5 text-xl text-orange-500 font-bold capitalize">
            Tambah Produk ({storeName})
          </h1>
          <p className="text-left mt-12">Nama Produk :</p>
          <input
            type="text"
            placeholder="Nama produk..."
            value={namaProduk}
            onChange={(e) => setNamaProduk(e.target.value)}
            required
            className="input input-bordered w-full bg-gray-50 mt-2"
          />
          <br />
          <section className="text-left">
            <p className="text-left mt-3">Foto Produk :</p>
            <input
              type="file"
              name="file"
              ref={ref}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              accept="image/png, image/jpeg, image/jpg"
              className="file-input file-input-bordered w-full max-w-xs bg-gray-50 mt-3"
            />
          </section>
          <p className="text-left mt-3">Deskripsi Produk :</p>
          <textarea
            placeholder="Deskripsi..."
            value={deskripsiProduk}
            onChange={(e) => setDeskripsiProduk(e.target.value)}
            maxLength={700}
            required
            className="w-full bg-gray-50 textarea textarea-bordered text-base mt-2"
          ></textarea>
          <br />
          <p className="text-left mt-2">Harga Produk :</p>
          <input
            type="text"
            placeholder="Harga..."
            value={hargaProduk}
            onChange={(e) => setHargaProduk(e.target.value)}
            required
            className="input input-bordered w-full bg-gray-50 mt-2"
          />
          <br />
          <p className="text-left mt-2">Kategori :</p>
          <select
            className="select select-bordered w-full mt-3 bg-gray-50 text-base"
            onChange={(e) => setKategoriProduk(e.target.value)}
            required
          >
            <option disabled selected value={"Fashion"}>
              Fashion
            </option>
            {category.map((item: any, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
          <br />
          <p className="text-left mt-2">
            Link <span className="text-sm">(Shopee/GoFood/Lainnya)</span> :
          </p>
          <input
            type="text"
            placeholder="Optional, kosongkan jika tidak ada"
            value={linkProduk}
            onChange={(e) => setLinkProduk(e.target.value)}
            className="input input-bordered w-full bg-gray-50 mt-2"
          />
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

export default AddProduct;
