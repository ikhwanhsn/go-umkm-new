"use client";

import { useEffect, useState } from "react";
import CardProduct from "./CardProduct";
import useSWR from "swr";
import { fetcher } from "@/libs/swr/fetcher";

const ProdukUnggulan = () => {
  const [productsBarusari, setProductsBarusari] = useState([]);
  const [productsBulustalan, setProductsBulustalan] = useState([]);
  const {
    data: dataBarusari,
    error: errorBarusari,
    isLoading: isLoadingBarusari,
  } = useSWR(`/api/products?limit=4&kelurahan=barusari`, fetcher);
  const {
    data: dataBulustalan,
    error: errorBulustalan,
    isLoading: isLoadingBulustalan,
  } = useSWR(`/api/products?limit=4&kelurahan=bulustalan`, fetcher);

  useEffect(() => {
    if (dataBarusari) {
      setProductsBarusari(dataBarusari);
    }
  }, [dataBarusari]);
  useEffect(() => {
    if (dataBulustalan) {
      setProductsBulustalan(dataBulustalan);
    }
  }, [dataBulustalan]);

  return (
    <main>
      <h1
        className="text-center text-2xl text-orange-500 font-bold lg:mt-20 mt-16"
        id="produk-unggulan"
      >
        Produk Unggulan
      </h1>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:px-24 md:px-12 px-5 mx-auto mt-7 lg:gap-7 md:gap-5 gap-3">
        {productsBarusari.length > 0 &&
          !isLoadingBarusari &&
          productsBarusari.map((item: any) => (
            <CardProduct
              key={item._id}
              id={item._id}
              myRef="product"
              src={item.image}
              name={item.name}
              mitra={item.storeName}
              price={item.price}
            />
          ))}
        {productsBulustalan.length > 0 &&
          !isLoadingBulustalan &&
          productsBulustalan.map((item: any) => (
            <CardProduct
              key={item._id}
              id={item._id}
              myRef="product"
              src={item.image}
              name={item.name}
              mitra={item.storeName}
              price={item.price}
            />
          ))}
      </section>
    </main>
  );
};

export default ProdukUnggulan;
