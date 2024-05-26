"use client";

import { fetcher } from "@/libs/swr/fetcher";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "@/services/firebase/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

const CreateStore = () => {
  const router = useRouter();
  const { data, status: session } = useSession();
  const [storeName, setStoreName] = useState("");
  const [storeDesc, setStoreDesc] = useState("");
  const [image, setImage] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);
  const [province, setProvince] = useState([]);
  const [provinceSelect, setProvinceSelect] = useState("");
  const [city, setCity] = useState([]);
  const [citySelect, setCitySelect] = useState("");
  const [kecamatan, setKecamatan] = useState([]);
  const [kecamatanSelect, setKecamatanSelect] = useState("");
  const [noTelp, setNoTelp] = useState("");

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

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;
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
      const imageUrl = await getDownloadURL(storageReference);

      // Save store data to MongoDB
      const res = await fetch("/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data?.user?.email,
          name: storeName,
          description: storeDesc,
          image: imageUrl,
          province: provinceSelect,
          city: citySelect,
          kecamatan: kecamatanSelect,
          telephone: noTelp,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      ref.current && (ref.current.value = "");
      await Swal.fire({
        title: "Success!",
        text: "Produk berhasil ditambahkan!",
        icon: "success",
      });
      await router.refresh();
      await router.push("/my-store");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (dataProvince) {
      setProvince(dataProvince);
    }
    if (dataCity) {
      setCity(dataCity);
    }
    if (dataKecamatan) {
      setKecamatan(dataKecamatan);
    }
  }, [dataProvince, dataCity, dataKecamatan]);

  return (
    <main className="w-full min-h-screen">
      <section className="lg:w-1/2 md:w-3/4 w-full md:mx-auto md:px-0 px-5 text-center">
        <form onSubmit={submit}>
          <h1 className="mt-5 text-xl text-orange-500 font-bold">Buat Toko</h1>
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
              onChange={(e) => setImage(e.target.files?.[0])}
              accept="image/png, image/jpeg, image/jpg"
              required
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
          <p className="text-left mt-2">Provinsi :</p>
          <select
            className="select select-bordered w-full mt-3 bg-gray-50"
            onChange={(e) => setProvinceSelect(e.target.value)}
            required
          >
            <option disabled selected value={""}>
              Pilih Provinsi
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
            required
          >
            <option disabled selected value={""}>
              Pilih Kota
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
            className="select select-bordered w-full mt-3 bg-gray-50"
            onChange={(e) => setKecamatanSelect(e.target.value)}
            required
          >
            <option disabled selected value={""}>
              Pilih Kecamatan
            </option>
            {kecamatan &&
              kecamatan.map((item: any) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
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
            <Link
              href={"/my-store"}
              className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white mt-5"
            >
              Batal
            </Link>
          </section>
        </form>
      </section>
    </main>
  );
};

export default CreateStore;
