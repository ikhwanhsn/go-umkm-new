"use client";

import CardProduct from "@/components/CardProduct";
import { fetcher } from "@/libs/swr/fetcher";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import useSWR from "swr";

const StoreKelurahan = () => {
  const { kelurahan } = useParams();
  const [allStore, setAllStore] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: dataStore,
    error: errorStore,
    isLoading: isLoadingStore,
  } = useSWR(
    `/api/store?limit=50&kelurahan=${kelurahan}&search=${searchTerm}`,
    fetcher
  );

  useEffect(() => {
    if (dataStore) {
      setAllStore(dataStore);
    }
  }, [dataStore]);

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main className="w-full min-h-screen lg:px-12 md:px-8 px-5 mt-5">
      <section className="flex md:flex-row flex-col justify-between md:items-center">
        <section>
          <h1 className="text-xl font-bold mb-1 capitalize">
            Store ({kelurahan})
          </h1>
          <p>Welcome to store page</p>
        </section>
        <section className="flex gap-2 justify-between items-center mt-3 md:mt-0">
          <label className="input input-bordered flex items-center gap-2 bg-gray-50 w-full">
            <input
              type="text"
              className="w-full"
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
      </section>
      <section className="mt-7">
        {allStore.length === 0 && !isLoadingStore && (
          <p className="text-center mt-12 text-sm italic">
            Toko tidak ditemukan
          </p>
        )}
        {isLoadingStore && (
          <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto mt-7 lg:gap-5 md:gap-4 gap-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <aside
                key={index}
                className="w-full h-fit p-5 bg-white rounded-md"
              >
                <section className="w-full rounded-sm aspect-square bg-gray-200 animate-pulse"></section>
                <section className="md:w-32 w-24 rounded-sm h-5 mt-2 bg-gray-200 animate-pulse"></section>
                <section className="md:w-24 w-16 rounded-sm h-5 mt-2 bg-gray-200 animate-pulse"></section>
              </aside>
            ))}
          </section>
        )}

        <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto mt-7 gap-5">
          {allStore.length > 0 &&
            !isLoadingStore &&
            allStore.map((item: any) => (
              <CardProduct
                key={item._id}
                id={item._id}
                city={item.kelurahan}
                src={item.image}
                name={item.name}
                mitra={item.mitra}
                myRef={"store"}
              />
            ))}
        </section>
      </section>
    </main>
  );
};

export default StoreKelurahan;
