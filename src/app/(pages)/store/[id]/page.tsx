"use client";

import Image from "next/image";
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
  } = useSWR(`/api/products/store/${userID}`, fetcher);

  useEffect(() => {
    if (dataStore) {
      const data = dataStore[0];
      setUserID(data.user_id);
      setNamaToko(data.name);
      setDeskripsiToko(data.description);
      setlogoToko(data.image);
      setProvinsi(data.province);
      setKota(data.city);
      setKecamatan(data.kecamatan);
      setTelpToko(data.telephone);
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
          <h2 className="text-xl font-semibold mb-3 capitalize">{namaToko}</h2>
          <p className="normal-case">{deskripsiToko}</p>
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
      <ProductOnStore data={product.length > 0 ? product : []} />
    </main>
  );
};

export default DetailStore;

const ProductOnStore = ({ data = [] }: { data: any[] }) => {
  return (
    <main>
      <h1 className="text-xl font-bold mb-1">Product</h1>
      {data.length === 0 && <p>Tidak ada product</p>}
      <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto mt-3 gap-5">
        {data.length > 0 &&
          data.map((item: any) => (
            <CardProduct
              key={item._id}
              id={item._id}
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
