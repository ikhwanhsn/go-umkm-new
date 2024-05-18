"use client";

import CardProduct from "./CardProduct";
import { fetcher } from "@/libs/swr/fetcher";
import useSWR from "swr";
import { useEffect, useState } from "react";

const AllProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const {
    data: dataProduct,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(`/api/products`, fetcher);

  useEffect(() => {
    if (dataProduct) {
      setAllProducts(dataProduct);
    }
  }, [dataProduct]);

  return (
    <main className="mt-7">
      <section className="grid grid-cols-5 mx-auto mt-7 gap-5">
        {allProducts.length > 0 &&
          allProducts.map((item: any) => (
            <CardProduct
              key={item.id}
              src={item.image}
              name={item.name}
              mitra={item.mitra || "mitra 1"}
              price={item.price}
            />
          ))}
      </section>
    </main>
  );
};

export default AllProduct;
