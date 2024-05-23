"use client";

import CardProduct from "./CardProduct";
import { fetcher } from "@/libs/swr/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useEffect, useState } from "react";

const ProdukFavorit = () => {
  const { data, status: session } = useSession();
  const [productLiked, setProductLiked] = useState([]);
  const {
    data: dataLiked,
    error: errorLiked,
    isLoading: isLoadingLiked,
  } = useSWR(`/api/favorite/email/${data?.user?.email}`, fetcher);

  useEffect(() => {
    if (dataLiked) {
      console.log(dataLiked);
      setProductLiked(dataLiked);
    }
  }, [dataLiked]);

  return (
    <main className="mt-7">
      {productLiked.length === 0 && !isLoadingLiked && (
        <p className="text-center mt-12 text-sm italic">
          Tidak ada produk yang disukai
        </p>
      )}
      <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto mt-7 gap-5">
        {productLiked.length > 0 &&
          !isLoadingLiked &&
          productLiked.map((item: any) => (
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

export default ProdukFavorit;
