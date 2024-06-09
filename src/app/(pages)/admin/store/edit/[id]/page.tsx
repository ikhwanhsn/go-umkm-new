// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useRef, useState } from "react";
// import {
//   ref as storageRef,
//   uploadBytes,
//   getDownloadURL,
// } from "firebase/storage";
// import { storage } from "@/services/firebase/firebase";
// import { useParams, useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// import { fetcher } from "@/libs/swr/fetcher";
// import useSWR from "swr";

// const EditStore = () => {
//   const { id } = useParams();
//   const router = useRouter();
//   const { data, status: session } = useSession();
//   const [storeName, setStoreName] = useState("");
//   const [storeDesc, setStoreDesc] = useState("");
//   const [storeImg, setStoreImg] = useState("");
//   const [kelurahan, setKelurahan] = useState("");
//   const [file, setFile] = useState<File>();
//   const ref = useRef<HTMLInputElement>(null);
//   const [noTelp, setNoTelp] = useState("");

//   const {
//     data: dataStore,
//     error: errorStore,
//     isLoading: isLoadingStore,
//   } = useSWR(`/api/store/id/${id}`, fetcher);

//   const defaultImageUrl =
//     "https://firebasestorage.googleapis.com/v0/b/go-umkm-9915e.appspot.com/o/default%2Fdefault-toko.png?alt=media&token=b5d4b965-99d0-4a13-85b0-09132333fc2a"; // Replace this with the actual URL

//   const submit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!file && !storeImg) return;
//     if (file && file.size > 1048576) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Ukuran foto terlalu besar. Maksimal 1 MB!",
//       });
//       return;
//     }

//     let imageUrl = storeImg; // Use default image URL by default

//     if (file) {
//       try {
//         // Upload image to Firebase Storage
//         const storageReference = storageRef(
//           storage,
//           `images/store/${data?.user?.email}/${file.name}`
//         );
//         await uploadBytes(storageReference, file);
//         imageUrl = await getDownloadURL(storageReference); // Use uploaded image URL
//       } catch (error) {
//         console.error(error);
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Kesalahan saat mengunggah gambar!",
//         });
//         return;
//       }
//     }

//     try {
//       // Save store data to MongoDB
//       const res = await fetch(`/api/store/id/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id: id,
//           NewName: storeName,
//           NewDescription: storeDesc,
//           NewImage: imageUrl,
//           NewKelurahan: kelurahan,
//           NewTelephone: noTelp,
//         }),
//       });

//       if (!res.ok) throw new Error(await res.text());
//       ref.current && (ref.current.value = "");
//       await Swal.fire({
//         title: "Success!",
//         text: "Toko berhasil diubah!",
//         icon: "success",
//       });
//       await router.refresh();
//       await router.push("/admin/barusari");
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Toko gagal diubah!",
//       });
//     }
//   };

//   useEffect(() => {
//     if (dataStore) {
//       const data = dataStore[0];
//       setStoreName(data.name);
//       setStoreDesc(data.description);
//       setStoreImg(data.image);
//       setNoTelp(data.telephone);
//       setKelurahan(data.kelurahan);
//     }
//   }, [dataStore]);

//   return (
//     <main className="w-full min-h-screen">
//       <section className="lg:w-1/2 md:w-3/4 w-full md:mx-auto md:px-0 px-5 text-center">
//         <form onSubmit={submit}>
//           <h1 className="mt-5 text-xl text-orange-500 font-bold capitalize">
//             Edit Toko
//           </h1>
//           <p className="text-left mt-12">Nama Toko :</p>
//           <input
//             type="text"
//             placeholder="Nama toko..."
//             id="nama"
//             value={storeName}
//             onChange={(e) => setStoreName(e.target.value)}
//             required
//             className="input input-bordered w-full bg-gray-50 mt-2"
//           />
//           <br />
//           <section className="text-left">
//             <p className="text-left mt-3">Logo Toko :</p>
//             <input
//               type="file"
//               name="file"
//               ref={ref}
//               onChange={(e: any) => setFile(e.target.files?.[0])}
//               accept="image/png, image/jpeg, image/jpg"
//               className="file-input file-input-bordered w-full max-w-xs bg-gray-50 mt-3"
//             />
//           </section>
//           <p className="text-left mt-3">Deskripsi :</p>
//           <textarea
//             placeholder="Deskripsi..."
//             maxLength={700}
//             rows={4}
//             value={storeDesc}
//             onChange={(e) => setStoreDesc(e.target.value)}
//             required
//             className="w-full bg-gray-50 textarea textarea-bordered text-base mt-3"
//           ></textarea>
//           <br />
//           <p className="text-left mt-2">Kelurahan :</p>
//           <input
//             type="text"
//             placeholder="Kelurahan..."
//             id="kelurahan"
//             value={"barusari"}
//             readOnly
//             className="input input-bordered w-full bg-gray-50 mt-2"
//           />
//           <p className="text-left mt-3">No Telp :</p>
//           <input
//             type="text"
//             placeholder="Nomor telephone..."
//             id="telp"
//             value={noTelp}
//             onChange={(e) => setNoTelp(e.target.value)}
//             required
//             className="input input-bordered w-full bg-gray-50 mt-2"
//           />
//           <br />
//           <section className="space-x-2">
//             <button
//               className="btn bg-orange-500 text-white border-none hover:bg-orange-600 mt-5"
//               type="submit"
//             >
//               Simpan
//             </button>
//             <button
//               type="button"
//               onClick={() => router.back()}
//               className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white mt-5"
//             >
//               Batal
//             </button>
//           </section>
//         </form>
//       </section>
//     </main>
//   );
// };

// export default EditStore;

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/services/firebase/firebase";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { fetcher } from "@/libs/swr/fetcher";
import useSWR from "swr";

const EditStore = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, status: session } = useSession();
  const [storeName, setStoreName] = useState("");
  const [storeDesc, setStoreDesc] = useState("");
  const [storeImg, setStoreImg] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [file, setFile] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);
  const [noTelp, setNoTelp] = useState("");
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [isPreviewImage, setIsPreviewImage] = useState(false);

  const {
    data: dataStore,
    error: errorStore,
    isLoading: isLoadingStore,
  } = useSWR(`/api/store/id/${id}`, fetcher);

  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/go-umkm-9915e.appspot.com/o/default%2Fdefault-toko.png?alt=media&token=b5d4b965-99d0-4a13-85b0-09132333fc2a"; // Replace this with the actual URL

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file && !storeImg && !isImageDeleted) return;
    if (file && file.size > 1048576) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ukuran foto terlalu besar. Maksimal 1 MB!",
      });
      return;
    }

    let imageUrl = storeImg; // Use current image URL by default

    if (file) {
      try {
        // Upload image to Firebase Storage
        const storageReference = storageRef(
          storage,
          `images/store/${data?.user?.email}/${file.name}`
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

    if (isImageDeleted) {
      imageUrl = defaultImageUrl; // Set image URL to default if the image was deleted and no new image was uploaded
    }

    try {
      // Save store data to MongoDB
      const res = await fetch(`/api/store/id/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          NewName: storeName,
          NewDescription: storeDesc,
          NewImage: imageUrl,
          NewKelurahan: kelurahan,
          NewTelephone: noTelp,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      ref.current && (ref.current.value = "");
      await Swal.fire({
        title: "Success!",
        text: "Toko berhasil diubah!",
        icon: "success",
      });
      await router.refresh();
      await router.push("/admin/barusari");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Toko gagal diubah!",
      });
    }
  };

  const deleteImage = async () => {
    if (!isPreviewImage) {
      try {
        const storageReference = storageRef(storage, storeImg);
        await deleteObject(storageReference);
        setStoreImg(defaultImageUrl);
        setIsImageDeleted(true);
        ref.current && (ref.current.value = "");
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal menghapus gambar!",
        });
      }
    } else {
      setStoreImg(defaultImageUrl);
      setIsImageDeleted(true);
      ref.current && (ref.current.value = "");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const previewUrl = URL.createObjectURL(file);
      setStoreImg(previewUrl);
      setIsPreviewImage(true);
    }
  };

  useEffect(() => {
    if (dataStore) {
      const data = dataStore[0];
      setStoreName(data.name);
      setStoreDesc(data.description);
      setStoreImg(data.image);
      setNoTelp(data.telephone);
      setKelurahan(data.kelurahan);
      setIsPreviewImage(false); // Reset preview image state
    }
  }, [dataStore]);

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
            <img
              src={storeImg}
              alt="Store Logo"
              className="w-32 h-32 object-cover mb-3 mt-3"
            />
            {storeImg && storeImg !== defaultImageUrl && !isImageDeleted && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={deleteImage}
                  className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Hapus Gambar
                </button>
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

export default EditStore;
