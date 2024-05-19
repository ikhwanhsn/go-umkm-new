"use client";

import Image from "next/image";
import produk1 from "../../../../../public/img/product1.jpg";
import produk2 from "../../../../../public/img/product2.jpg";
import produk3 from "../../../../../public/img/product3.jpg";
import produk4 from "../../../../../public/img/product4.jpg";
import produk5 from "../../../../../public/img/product5.jpg";
import produk6 from "../../../../../public/img/product6.jpg";
import produk7 from "../../../../../public/img/product7.jpg";
import produk8 from "../../../../../public/img/product8.jpg";
import produk9 from "../../../../../public/img/product9.jpg";
import produk10 from "../../../../../public/img/product10.jpg";
import CardProduct from "@/components/CardProduct";
import useSWR from "swr";
import { fetcher } from "@/libs/swr/fetcher";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const DetailStore = () => {
  const { id } = useParams();
  const { data, status: session } = useSession();
  const [namaToko, setNamaToko] = useState("");
  const [deskripsiToko, setDeskripsiToko] = useState("");
  const [logoToko, setlogoToko] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [telpToko, setTelpToko] = useState("");
  const {
    data: dataStore,
    error: errorStore,
    isLoading: isLoadingStore,
  } = useSWR(`/api/store?email=${data?.user?.email}`, fetcher);

  useEffect(() => {
    if (dataStore) {
      const data = dataStore[0];
      setNamaToko(data.name);
      setDeskripsiToko(data.description);
      setlogoToko(data.image);
      setProvinsi(data.province);
      setKota(data.city);
      setKecamatan(data.kecamatan);
      setTelpToko(data.telephone);
    }
  }, [dataStore]);

  return (
    <main className="min-h-screen lg:px-12 md:px-8 px-5 mt-5">
      <h1 className="text-xl font-bold mb-1">Detail Store</h1>
      <section className="flex md:flex-row flex-col mt-3 mb-5 gap-x-10 gap-y-5">
        <section>
          <Image
            src={logoToko}
            alt="image-product"
            width={200}
            height={200}
            className="md:w-80 w-full h-80 object-cover rounded-sm"
          />
        </section>
        <aside>
          <h2 className="text-xl font-semibold mb-3">{namaToko}</h2>
          <p>{deskripsiToko}</p>
          <section className="space-x-1 mt-5">
            <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
              Chat toko
            </button>
            <button className="btn bg-orange-500 text-white border-none hover:bg-orange-600">
              Beli sekarang
            </button>
          </section>
        </aside>
      </section>
      <ProductOnStore />
    </main>
  );
};

export default DetailStore;

const dataProduk = [
  {
    id: 1,
    image: produk1,
    name: "Kopi Lorepsipa",
    mitra: "Nama mitra 1",
    price: "Rp. 71.000",
  },
  {
    id: 2,
    image: produk2,
    name: "Teh Serenili",
    mitra: "Nama mitra 2",
    price: "Rp. 72.000",
  },
  {
    id: 3,
    image: produk3,
    name: "Minuman Coklat Beraroma",
    mitra: "Nama mitra 3",
    price: "Rp. 73.500",
  },
  {
    id: 4,
    image: produk4,
    name: "Sari Buah Segar",
    mitra: "Nama mitra 4",
    price: "Rp. 65.000",
  },
  {
    id: 5,
    image: produk5,
    name: "Es Krim Homemade",
    mitra: "Nama mitra 5",
    price: "Rp. 80.000",
  },
  {
    id: 6,
    image: produk6,
    name: "Kue Tradisional",
    mitra: "Nama mitra 6",
    price: "Rp. 45.000",
  },
  {
    id: 7,
    image: produk7,
    name: "Jus Segar 100% Buah Lokal",
    mitra: "Nama mitra 7",
    price: "Rp. 55.000",
  },
  {
    id: 8,
    image: produk8,
    name: "Smoothie Sayur Organik",
    mitra: "Nama mitra 8",
    price: "Rp. 60.000",
  },
  {
    id: 9,
    image: produk9,
    name: "Kopi Hitam",
    mitra: "mitra 9",
    price: "Rp. 80.000",
  },
  {
    id: 10,
    image: produk10,
    name: "Nasi Jagung",
    mitra: "mitra 10",
    price: "Rp. 20.000",
  },
];

const ProductOnStore = () => {
  return (
    <main>
      <h1 className="text-xl font-bold mb-1">Product</h1>
      <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto mt-3 gap-5">
        {dataProduk.map((item: any) => (
          <CardProduct
            key={item.id}
            id={item.id}
            src={item.image}
            name={item.name}
            mitra={item.mitra}
            price={item.price}
          />
        ))}
      </section>
    </main>
  );
};
