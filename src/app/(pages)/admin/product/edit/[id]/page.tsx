"use client";

import { fetcher } from "@/libs/swr/fetcher";
import { storage } from "@/services/firebase/firebase";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { useSession } from "next-auth/react";
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
  const [storeID, setStoreID] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [deskripsiProduk, setDeskripsiProduk] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [hargaProduk, setHargaProduk] = useState("");
  const [kategoriProduk, setKategoriProduk] = useState("");
  const [linkProduk, setLinkProduk] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  const {
    data: dataProduct,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(`/api/products/${id}`, fetcher);

  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/go-umkm-9915e.appspot.com/o/default%2Fdefault-product.jpg?alt=media&token=8f519d60-5f76-4b47-921a-72b5fff871b8"; // Replace this with the actual URL

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file && !imageURL && !isImageDeleted) return;
    if (file && file.size > 1048576) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ukuran foto terlalu besar. Maksimal 1 MB!",
      });
      return;
    }

    let imageUrl = imageURL; // Use current image URL by default

    if (file) {
      try {
        // Upload image to Firebase Storage
        const storageReference = storageRef(
          storage,
          `images/product/${Math.floor(Math.random() * 1000000)}/${file.name}`
        );
        await uploadBytes(storageReference, file);
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

    if (isImageDeleted && !file) {
      imageUrl = defaultImageUrl; // Set image URL to default if the image was deleted and no new image was uploaded
    }

    try {
      // Save product data to MongoDB
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          store_id: storeID,
          NewName: namaProduk,
          NewDescription: deskripsiProduk,
          NewImage: imageUrl,
          NewPrice: hargaProduk,
          NewCategory: kategoriProduk,
          NewLink: linkProduk,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      ref.current && (ref.current.value = "");
      await Swal.fire({
        title: "Success!",
        text: "Produk berhasil diubah!",
        icon: "success",
      });
      await router.back();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Produk gagal diubah!",
      });
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
            body: JSON.stringify({ id }),
          });

          if (!res.ok) {
            alert(await res.text());
            return;
          }
          router.back();
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setIsImageDeleted(false); // Reset isImageDeleted to false when a new file is uploaded
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setImagePreview(defaultImageUrl);
    setIsImageDeleted(true);
    if (ref.current) {
      ref.current.value = "";
    }
    setImageURL("");
  };

  useEffect(() => {
    if (dataProduct) {
      const data = dataProduct.product;
      setStoreID(data.store_id);
      setNamaProduk(data.name);
      setDeskripsiProduk(data.description);
      setImageURL(data.image);
      setImagePreview(data.image);
      setHargaProduk(data.price);
      setKategoriProduk(data.category);
      setLinkProduk(data.link);
      setIsImageDeleted(false);
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
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="w-32 h-32 object-cover mb-3 mt-3"
                />
                {imagePreview !== defaultImageUrl && (
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
              onChange={handleFileChange}
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
            <option disabled selected value={kategoriProduk}>
              {kategoriProduk}
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
          <section className="flex items-center gap-1 justify-center mt-5">
            <button
              className="btn bg-orange-500 text-white border-none hover:bg-orange-600"
              type="submit"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              Batal
            </button>
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
