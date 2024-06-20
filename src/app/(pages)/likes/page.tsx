"use client";

import CardProduct from "@/components/CardProduct";
import { fetcher } from "@/libs/swr/fetcher";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

const ProductLiked = () => {
  const { data, status: session } = useSession();
  const [productLiked, setProductLiked] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: dataLiked,
    error: errorLiked,
    isLoading: isLoadingLiked,
  } = useSWR(`/api/favorite/email/${data?.user?.email}`, fetcher);

  useEffect(() => {
    if (dataLiked) {
      setProductLiked(dataLiked);
    }
  }, [dataLiked]);

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = productLiked.filter((product: any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen lg:px-12 md:px-8 px-5 mt-5">
      <section className="flex md:flex-row flex-col justify-between md:items-center items-start">
        <section>
          <h1 className="text-xl font-bold mb-1">Favorite Product</h1>
          <p>Welcome to favorite page</p>
        </section>
        <label className="input input-bordered mt-3 md:mt-0 flex items-center gap-2 bg-gray-50">
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </section>
      <main className="mt-7">
        {session === "unauthenticated" && (
          <p className="text-center mt-12 text-sm italic">
            Silahkan login dulu...
          </p>
        )}
        {productLiked.length === 0 && !isLoadingLiked && (
          <p className="text-center mt-12 text-sm italic">
            Tidak ada produk yang disukai
          </p>
        )}
        {productLiked.length > 0 &&
          filteredProducts.length === 0 &&
          !isLoadingLiked && (
            <p className="text-center mt-12 text-sm italic">
              Produk tidak ditemukan
            </p>
          )}
        {isLoadingLiked && (
          <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto mt-7 lg:gap-5 md:gap-4 gap-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <aside
                key={index}
                className="w-full h-fit p-5 bg-white rounded-md"
              >
                <section className="w-full rounded-sm aspect-square bg-gray-200 animate-pulse"></section>
                <section className="md:w-32 w-24 rounded-sm h-5 mt-2 bg-gray-200 animate-pulse"></section>
                <section className="md:w-24 w-16 rounded-sm h-5 mt-2 bg-gray-200 animate-pulse"></section>
                <section className="md:w-16 w-12 rounded-sm h-5 mt-3 bg-gray-200 animate-pulse"></section>
              </aside>
            ))}
          </section>
        )}
        <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto mt-7 gap-5">
          {filteredProducts.length > 0 &&
            filteredProducts.map((item: any) => (
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
    </main>
  );
};

export default ProductLiked;
