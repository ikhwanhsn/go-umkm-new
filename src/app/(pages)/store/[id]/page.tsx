"use client";

import Image from "next/image";
import CardProduct from "@/components/CardProduct";
import useSWR from "swr";
import { fetcher } from "@/libs/swr/fetcher";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DetailStore = () => {
  const { id } = useParams();
  const [namaToko, setNamaToko] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nib, setNib] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [deskripsiToko, setDeskripsiToko] = useState("");
  const [logoToko, setlogoToko] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [telpToko, setTelpToko] = useState("");
  const [product, setProduct] = useState([]);
  const [userID, setUserID] = useState("");
  const {
    data: dataStore,
    error: errorStore,
    isLoading: isLoadingStore,
  } = useSWR(`/api/store/id/${id}`, fetcher);
  const {
    data: dataProducts,
    error: errorProducts,
    isLoading: isLoadingProducts,
  } = useSWR(`/api/my-products/${id}`, fetcher);

  useEffect(() => {
    if (dataStore) {
      // console.log(dataStore);
      const data = dataStore[0];
      setUserID(data.user_id);
      setNamaToko(data.name);
      setDeskripsiToko(data.description);
      setlogoToko(data.image);
      setProvinsi(data.province);
      setKota(data.city);
      setKecamatan(data.kecamatan);
      setTelpToko(data.telephone);
      setAlamat(data.alamat);
      setKelurahan(data.kelurahan);
      setNib(data.nib);
    }
  }, [dataStore, dataProducts]);
  useEffect(() => {
    if (dataProducts) {
      setProduct(dataProducts.product);
    }
  }, [dataProducts]);

  return (
    <main className="min-h-screen lg:px-12 md:px-8 px-5 mt-5">
      <h1 className="text-xl font-bold mb-1">Detail Store</h1>
      {isLoadingStore && (
        <>
          <section className="flex md:grid grid-cols-12 flex-col mt-3 mb-8 gap-y-5">
            <section className="md:w-80 w-full lg:col-span-4 md:col-span-6">
              <aside className="md:w-80 w-full aspect-square rounded-sm object-cover bg-gray-200 animate-pulse"></aside>
            </section>
            <aside className="mt-0 col-span-8 md:col-span-6">
              <h2 className="text-xl font-semibold mb-3 bg-gray-200 animate-pulse w-24 h-6 rounded-sm"></h2>
              <p className="bg-gray-200 animate-pulse w-full h-24 rounded-sm"></p>
              <h2 className="mt-1 bg-gray-200 animate-pulse w-24 h-6 rounded-sm"></h2>
              <h2 className="mt-1 bg-gray-200 animate-pulse w-32 h-6 rounded-sm"></h2>
              <h2 className="mt-1 bg-gray-200 animate-pulse w-28 h-6 rounded-sm"></h2>
              <h2 className="mt-1 bg-gray-200 animate-pulse w-20 h-6 rounded-sm"></h2>
              <section className="flex items-center gap-1 mt-5">
                <aside className="bg-gray-200 animate-pulse w-24 h-10 rounded-md"></aside>
                <aside className="bg-gray-200 animate-pulse w-24 h-10 rounded-md"></aside>
                <aside className="bg-gray-200 animate-pulse w-12 h-10 rounded-md"></aside>
              </section>
            </aside>
          </section>
        </>
      )}
      {!isLoadingStore && (
        <section className="flex md:grid grid-cols-12 flex-col mt-3 mb-5 gap-y-5">
          <section className="lg:col-span-4 md:col-span-6">
            <Image
              src={logoToko}
              alt="image-product"
              width={200}
              height={200}
              className="md:w-80 w-full h-80 object-cover rounded-sm"
            />
          </section>
          <aside className="lg:col-span-8 md:col-span-6">
            <h2 className="text-xl font-semibold mb-3 capitalize">
              {namaToko}
            </h2>
            <p className="normal-case">{deskripsiToko}</p>
            <h2 className="mt-1 capitalize">
              <span className="font-semibold">Alamat :</span> {alamat}
            </h2>
            <h2 className="mt-1 capitalize">
              <span className="font-semibold">Kelurahan :</span> {kelurahan}
            </h2>
            <h2 className="mt-1">
              <span className="font-semibold">NIB :</span> {nib}
            </h2>
            <section className="space-x-1 mt-5">
              <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                Hubungi via Whatsapp
              </button>
              {/* <button className="btn bg-orange-500 text-white border-none hover:bg-orange-600">
              Beli sekarang
            </button> */}
            </section>
          </aside>
        </section>
      )}
      <ProductOnStore
        data={product.length > 0 ? product : []}
        namaToko={namaToko}
        isLoading={isLoadingProducts}
      />
    </main>
  );
};

export default DetailStore;

const ProductOnStore = ({
  data = [],
  namaToko,
  isLoading,
}: {
  data: any[];
  namaToko: string;
  isLoading: boolean;
}) => {
  return (
    <main>
      <h1 className="text-xl font-bold mb-1">Product</h1>
      {isLoading && (
        <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto mt-7 lg:gap-5 md:gap-4 gap-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <aside key={index} className="w-full h-fit p-5 bg-white rounded-md">
              <section className="w-full rounded-sm aspect-square bg-gray-200 animate-pulse"></section>
              <section className="md:w-32 w-24 rounded-sm h-5 mt-2 bg-gray-200 animate-pulse"></section>
              <section className="md:w-24 w-16 rounded-sm h-5 mt-2 bg-gray-200 animate-pulse"></section>
              <section className="md:w-16 w-12 rounded-sm h-5 mt-3 bg-gray-200 animate-pulse"></section>
            </aside>
          ))}
        </section>
      )}
      {data.length === 0 && <p>Tidak ada product</p>}
      <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto mt-3 gap-5">
        {data.length > 0 &&
          !isLoading &&
          data.map((item: any) => (
            <CardProduct
              key={item._id}
              id={item._id}
              myRef="product"
              src={item.image}
              name={item.name}
              mitra={namaToko}
              price={item.price}
            />
          ))}
      </section>
    </main>
  );
};
