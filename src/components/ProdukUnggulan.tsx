"use client";

import { useEffect, useState } from "react";
import CardProduct from "./CardProduct";
import useSWR from "swr";
import { fetcher } from "@/libs/swr/fetcher";

const ProdukUnggulan = () => {
  const [allProducts, setAllProducts] = useState([]);
  const {
    data: dataProduct,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(`/api/products?limit=8`, fetcher);

  useEffect(() => {
    if (dataProduct) {
      setAllProducts(dataProduct);
    }
  }, [dataProduct]);

  return (
    <main>
      <h1
        className="text-center text-2xl text-orange-500 font-bold lg:mt-20 mt-16"
        id="produk-unggulan"
      >
        Produk Unggulan
      </h1>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:px-24 md:px-12 px-5 mx-auto mt-7 lg:gap-7 md:gap-5 gap-3">
        {allProducts.length > 0 &&
          !isLoadingProduct &&
          allProducts.map((item: any) => (
            <CardProduct
              key={item._id}
              id={item._id}
              myRef="product"
              src={item.image}
              name={item.name}
              mitra={item.store_info.name}
              price={item.price}
            />
          ))}
      </section>
    </main>
  );
};

export default ProdukUnggulan;
