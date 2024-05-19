"use client";

import { fetcher } from "@/libs/swr/fetcher";
import { storage } from "@/services/firebase/firebase";
import { storageRefFromURL } from "@/services/storageRefFromURL";
import {
  ref as storageRef,
  deleteObject,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
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

const EditProduct = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, status: session } = useSession();
  const [namaProduk, setNamaProduk] = useState("");
  const [deskripsiProduk, setDeskripsiProduk] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [hargaProduk, setHargaProduk] = useState("");
  const [kategoriProduk, setKategoriProduk] = useState("Fashion");
  const [linkProduk, setLinkProduk] = useState("");
  const [file, setFile] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);
  const {
    data: dataProduct,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(`/api/products/${id}`, fetcher);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file && !imageURL) return;
    if (file && file.size > 1048576) {
      // console.error("Ukuran file terlalu besar. Maksimal 1 MB.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ukuran foto terlalu besar. Maksimal 1 MB!",
      });
      return;
    }

    let imageUrl = imageURL; // Menggunakan URL gambar saat ini jika tidak ada gambar baru diunggah

    try {
      // Upload new image to Firebase Storage if file exists
      if (file) {
        const storageReference = storageRef(
          storage,
          `images/product/${data?.user?.email}/${file.name}`
        );
        await uploadBytes(storageReference, file);
        imageUrl = await getDownloadURL(storageReference);

        // Delete the old image if exists
        if (imageURL) {
          const oldImageRef = storageRefFromURL(imageURL);
          await deleteObject(oldImageRef);
        }
      }

      // Update store data in MongoDB
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data?.user?.email,
          NewName: namaProduk,
          NewDescription: deskripsiProduk,
          NewImage: imageUrl,
          NewPrice: hargaProduk,
          NewCategory: kategoriProduk,
          NewLink: linkProduk,
        }),
      });

      if (!res.ok) {
        if (file) {
          const storageReference = storageRef(
            storage,
            `images/store/${data?.user?.email}/${file.name}`
          );
          await deleteObject(storageReference);
        }
        // throw new Error(await res.text());
        alert(await res.text());
        return;
      }

      ref.current && (ref.current.value = "");
      await Swal.fire({
        title: "Good job!",
        text: "Produk Anda telah diperbarui!",
        icon: "success",
      });
      await router.push("/my-store");
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProduct = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Produk Anda akan di hapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, email: data?.user?.email }),
          });

          if (!res.ok) {
            alert(await res.text());
            return;
          }
          router.push("/my-store");
          Swal.fire({
            title: "Deleted!",
            text: "Produk Anda telah di hapus!",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    if (dataProduct) {
      const data = dataProduct?.product;
      // console.log(data);
      setNamaProduk(data.name);
      setDeskripsiProduk(data.description);
      setImageURL(data.image);
      setHargaProduk(data.price);
      setKategoriProduk(data.category);
      setLinkProduk(data.link);
    }
  }, [dataProduct]);

  return (
    <main className="w-full min-h-screen">
      <section className="lg:w-1/2 md:w-3/4 w-full md:px-0 px-5 mx-auto text-center">
        <form onSubmit={submit}>
          <h1 className="mt-5 text-xl text-orange-500 font-bold">
            Edit Produk
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
              onChange={(e) => setFile(e.target.files?.[0])}
              accept="image/png, image/jpeg, image/jpg"
              className="file-input file-input-bordered w-full max-w-xs bg-gray-50 mt-3"
            />
          </section>
          <p className="text-left mt-3">Deskripsi Produk :</p>
          <textarea
            placeholder="Deskripsi..."
            value={deskripsiProduk}
            onChange={(e) => setDeskripsiProduk(e.target.value)}
            maxLength={300}
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
            placeholder="Link..."
            value={linkProduk}
            onChange={(e) => setLinkProduk(e.target.value)}
            required
            className="input input-bordered w-full bg-gray-50 mt-2"
          />
          <section className="flex items-center gap-1 justify-center mt-5">
            <button
              className="btn bg-orange-500 text-white border-none hover:bg-orange-600"
              type="submit"
            >
              Simpan
            </button>
            <Link
              href={"/my-store"}
              className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              Batal
            </Link>
            <button
              className="btn bg-red-500 text-white border-none hover:bg-red-600"
              type="button"
              onClick={deleteProduct}
            >
              <MdOutlineDelete size={22} />
            </button>
          </section>
        </form>
      </section>
    </main>
  );
};

export default EditProduct;
