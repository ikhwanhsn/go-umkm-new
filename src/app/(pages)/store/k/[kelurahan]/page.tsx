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
  const {
    data: dataStore,
    error: errorStore,
    isLoading: isLoadingStore,
  } = useSWR(`/api/store?limit=50&kelurahan=${kelurahan}`, fetcher);
  useEffect(() => {
    if (dataStore) {
      setAllStore(dataStore);
    }
  }, [dataStore]);

  return (
    <main className="w-full min-h-screen lg:px-12 md:px-8 px-5 mt-5">
      <section className="flex md:flex-row flex-col justify-between md:items-center">
        <section>
          <h1 className="text-xl font-bold mb-1 capitalize">
            All Store ({kelurahan})
          </h1>
          <p>Welcome to all store page</p>
        </section>
        <section className="flex gap-2 justify-between items-center mt-3 md:mt-0">
          <label className="input input-bordered flex items-center gap-2 bg-gray-50 w-full">
            <input
              type="text"
              className="w-full"
              placeholder="Search here..."
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
          {/* <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 btn-outline border-gray-200 hover:bg-gray-100"
            >
              <FiFilter className="text-black" />
            </div>
            <div
              tabIndex={0}
              className="dropdown-content z-[1] menu px-3 py-2 shadow bg-gray-50 rounded-box w-44"
            >
              <div className="form-control">
                <label className="label cursor-pointer flex justify-between w-full">
                  <span className="label-text text-black">Barusari</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text text-black">Bulustalan</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
            </div>
          </div> */}
        </section>
      </section>
      {/* <AllStore /> */}
      <section className="mt-7">
        {allStore.length === 0 && !isLoadingStore && (
          <p className="text-center mt-12 text-sm italic">Tidak ada toko</p>
        )}
        <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto mt-7 gap-5">
          {allStore.length > 0 &&
            !isLoadingStore &&
            allStore.map((item: any) => (
              <CardProduct
                key={item._id}
                id={item._id}
                city={"Indonesia"}
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
