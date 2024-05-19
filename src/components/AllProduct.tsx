"use client";

import CardProduct from "./CardProduct";
import { fetcher } from "@/libs/swr/fetcher";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
      {allProducts.length === 0 && (
        <p className="text-center mt-12 text-sm italic">Tidak ada produk</p>
      )}
      <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto mt-7 lg:gap-5 md:gap-4 gap-3">
        {allProducts.length > 0 &&
          allProducts.map((item: any) => (
            <CardProduct
              key={item._id}
              id={item._id}
              myRef={"product"}
              src={item.image}
              name={item.name}
              mitra={"mitra 1"}
              price={item.price}
            />
          ))}
      </section>
    </main>
  );
};

export default AllProduct;
