"use client";

import Image, { StaticImageData } from "next/image";
import { fetcher } from "@/libs/swr/fetcher";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/services/firebase/firebase";
import { storageRefFromURL } from "@/services/storageRefFromURL";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";

const MyStore = () => {
  const { data, status: session } = useSession();
  const [storeId, setStoreId] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeDesc, setStoreDesc] = useState("");
  const [storeImg, setStoreImg] = useState("");
  const [storeProv, setStoreProv] = useState("");
  const [storeCity, setStoreCity] = useState("");
  const [storeKec, setStoreKec] = useState("");
  const [storeTelp, setStoreTelp] = useState("");
  const [province, setProvince] = useState([]);
  const [provinceName, setProvinceName] = useState();
  const [provinceSelect, setProvinceSelect] = useState("");
  const [city, setCity] = useState([]);
  const [cityName, setCityName] = useState("");
  const [citySelect, setCitySelect] = useState("");
  const [kecamatan, setKecamatan] = useState([]);
  const [kecamatanName, setKecamatanName] = useState("");
  const [kecamatanSelect, setKecamatanSelect] = useState("");
  const [myProducts, setMyProducts] = useState([]);
  const [file, setFile] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);
  const {
    data: dataStore,
    error: errorStore,
    isLoading: isLoadingStore,
  } = useSWR(`/api/store?email=${data?.user?.email}`, fetcher);
  const {
    data: dataProvince,
    error: errorProvince,
    isLoading: isLoadingProvince,
  } = useSWR(
    "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
    fetcher
  );
  const {
    data: dataCity,
    error: errorCity,
    isLoading: isLoadingCity,
  } = useSWR(
    `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceSelect}.json`,
    fetcher
  );
  const {
    data: dataKecamatan,
    error: errorKecamatan,
    isLoading: isLoadingKecamatan,
  } = useSWR(
    `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${citySelect}.json`,
    fetcher
  );
  const {
    data: dataProducts,
    error: errorProducts,
    isLoading: isLoadingProducts,
  } = useSWR(`/api/products?email=${data?.user?.email}`, fetcher);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file && !storeImg) return;
    if (file && file.size > 1048576) {
      console.error("Ukuran file terlalu besar. Maksimal 1 MB.");
      return;
    }

    let imageUrl = storeImg; // Menggunakan URL gambar saat ini jika tidak ada gambar baru diunggah

    try {
      // Upload new image to Firebase Storage if file exists
      if (file) {
        const storageReference = storageRef(
          storage,
          `images/store/${data?.user?.email}/${file.name}`
        );
        await uploadBytes(storageReference, file);
        imageUrl = await getDownloadURL(storageReference);

        // Delete the old image if exists
        if (storeImg) {
          const oldImageRef = storageRefFromURL(storeImg);
          await deleteObject(oldImageRef);
        }
      }

      // Update store data in MongoDB
      const res = await fetch(`/api/store/${data?.user?.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data?.user?.email,
          NewName: storeName,
          NewDescription: storeDesc,
          NewImage: imageUrl,
          NewProvince: provinceSelect,
          NewCity: citySelect,
          NewKecamatan: kecamatanSelect,
          NewTelephone: storeTelp,
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
        title: "Success!",
        text: "Data has been updated!",
        icon: "success",
      });

      await window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStore = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Toko Anda akan di hapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`/api/store/${storeId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ storeId, email: data?.user?.email }),
          });

          if (!res.ok) {
            alert(await res.text());
            return;
          }
          Swal.fire({
            title: "Deleted!",
            text: "Toko Anda telah di hapus!",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error(error);
      alert("Failed to delete store");
    }
  };

  useEffect(() => {
    if (dataStore) {
      const data = dataStore[0];
      setStoreId(data?._id);
      setStoreName(data?.name);
      setStoreDesc(data?.description);
      setStoreImg(data?.image);
      setStoreProv(data?.province);
      setStoreCity(data?.city);
      setStoreKec(data?.kecamatan);
      setStoreTelp(data?.telephone);
      setProvinceSelect(data?.province);
      setCitySelect(data?.city);
      setKecamatanSelect(data?.kecamatan);
    }
  }, [dataStore]);

  useEffect(() => {
    if (dataProvince) {
      setProvince(dataProvince);
      const prov = dataProvince.find((prov: any) => prov.id === storeProv);
      setProvinceName(prov?.name);
    }
    if (dataCity) {
      setCity(dataCity);
      const city = dataCity.find((city: any) => city.id === storeCity);
      setCityName(city?.name);
    }
    if (dataKecamatan) {
      setKecamatan(dataKecamatan);
      const kec = dataKecamatan.find((kec: any) => kec.id === storeKec);
      setKecamatanName(kec?.name);
    }
    if (dataStore) {
      setProvinceSelect(dataStore[0]?.province);
      setCitySelect(dataStore[0]?.city);
    }
  }, [dataProvince, dataCity, dataKecamatan]);

  useEffect(() => {
    if (dataProducts) {
      setMyProducts(dataProducts);
    }
  }, [dataProducts]);

  return (
    <main className="w-full min-h-screen">
      {dataStore?.length === 0 && !isLoadingStore && (
        <center className="mt-24">
          <p className="mb-3">Anda belum memiliki toko</p>
          <Link href="/my-store/create">
            <button className="btn bg-orange-500 text-white border-none hover:bg-orange-600">
              Buka toko
            </button>
          </Link>
        </center>
      )}
      {dataStore?.length > 0 && !isLoadingStore && (
        <main className="lg:mx-12 md:mx-8 mx-5 mt-5">
          <section className="flex justify-between items-center">
            <section>
              <h1 className="text-xl font-bold mb-1">My Store</h1>
              <p>Welcome to my store page</p>
            </section>
          </section>
          <form
            className="flex md:flex-row flex-col mt-5 gap-12"
            onSubmit={submit}
          >
            <section>
              <Image
                src={storeImg}
                alt="store"
                width={300}
                height={300}
                className="w-full md:w-96 h-full md:h-64 object-cover"
              />
            </section>
            <section className="w-full">
              <label htmlFor="name">Nama Toko</label>
              <br />
              <input
                type="text"
                id="name"
                className="input input-bordered bg-gray-50 w-full my-1"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
              <label htmlFor="deskripsi">Deskripsi</label>
              <br />
              <textarea
                id="deskripsi"
                value={storeDesc}
                maxLength={300}
                rows={4}
                onChange={(e) => setStoreDesc(e.target.value)}
                className="w-full bg-gray-50 textarea textarea-bordered text-base mt-1"
              ></textarea>
              <section className="text-left space-x-3">
                <p className="text-left mt-3">Logo Toko :</p>
                <input
                  type="file"
                  name="file"
                  ref={ref}
                  onChange={(e) => setFile(e.target.files?.[0])}
                  accept="image/png, image/jpeg, image/jpg"
                  className="file-input file-input-bordered w-full max-w-xs bg-gray-50 mt-3"
                />
              </section>
              <p className="text-left mt-2">Provinsi :</p>
              <select
                className="select select-bordered w-full mt-3 bg-gray-50"
                onChange={(e) => setProvinceSelect(e.target.value)}
              >
                <option disabled selected value={provinceName}>
                  {provinceName}
                </option>
                {province &&
                  province.map((item: any) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <br />
              <p className="text-left mt-2">Kota :</p>
              <select
                className="select select-bordered w-full mt-3 bg-gray-50"
                onChange={(e) => setCitySelect(e.target.value)}
              >
                <option disabled selected value={cityName}>
                  {cityName}
                </option>
                {city &&
                  city.map((item: any) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <br />
              <p className="text-left mt-2">Kecamatan :</p>
              <select
                className="select select-bordered w-full mt-3 mb-2 bg-gray-50"
                onChange={(e) => setKecamatanSelect(e.target.value)}
              >
                <option disabled selected value={kecamatanName}>
                  {kecamatanName}
                </option>
                {kecamatan &&
                  kecamatan.map((item: any) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <label htmlFor="telp">No Telp</label>
              <br />
              <input
                type="text"
                id="telp"
                className="input input-bordered bg-gray-50 w-full my-1"
                value={storeTelp}
                onChange={(e) => setStoreTelp(e.target.value)}
              />
              <section className="flex items-center gap-1">
                <button
                  className="btn bg-orange-500 text-white border-none hover:bg-orange-600 mt-2"
                  type="submit"
                >
                  Update
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white mt-2"
                >
                  Batal
                </button>
                <button
                  className="btn bg-red-500 text-white border-none hover:bg-red-600 mt-2"
                  type="button"
                  onClick={deleteStore}
                >
                  <MdOutlineDelete size={22} />
                </button>
              </section>
            </section>
          </form>
          <section className="mt-12">
            <section className="flex justify-between items-center">
              <section>
                <h1 className="text-xl font-bold mb-1">My Product</h1>
                <p>List all product</p>
              </section>
              <section className="space-x-1 mt-5">
                <Link
                  href="/my-store/add-product"
                  className="btn bg-orange-500 text-white border-none hover:bg-orange-600"
                >
                  Tambah Produk
                </Link>
              </section>
            </section>
            {myProducts.length === 0 && (
              <p className="mt-24 text-sm italic text-center">
                Tidak ada produk
              </p>
            )}
            <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto mt-3 lg:gap-5 md:gap-4 gap-3">
              {myProducts.length > 0 &&
                myProducts.map((item: any) => (
                  <MyProducts
                    key={item._id}
                    id={item._id}
                    src={item.image}
                    name={item.name}
                    price={item.price}
                  />
                ))}
            </section>
          </section>
        </main>
      )}
    </main>
  );
};

export default MyStore;

// ==================================
type MyProductsProps = {
  id: string;
  src: StaticImageData;
  name: string;
  price?: string;
  myRef?: string;
};

const MyProducts = ({ id, src, name, price, myRef }: MyProductsProps) => {
  const router = useRouter();

  return (
    <main
      className="shadow-md p-5 rounded-lg hover:bg-gray-100 transition-all cursor-pointer overflow-hidden"
      onClick={() => router.push(`/my-store/edit-product/${id}`)}
    >
      <Image
        src={src}
        alt="image-product"
        width={300}
        height={300}
        className="mx-auto w-full lg:h-44 md:h-52 h-32 rounded-sm mb-3 object-cover"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="flex items-center gap-1">
        {myRef === "store" && <FiMapPin />}
      </p>
      {price && (
        <p className="text-orange-500 text-lg font-semibold mt-3">Rp{price}</p>
      )}
    </main>
  );
};
