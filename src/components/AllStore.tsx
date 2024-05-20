"use client";

import CardProduct from "./CardProduct";
import { useEffect, useState } from "react";
import { fetcher } from "@/libs/swr/fetcher";
import useSWR from "swr";

const AllStore = () => {
  const [allStore, setAllStore] = useState([]);
  const {
    data: dataStore,
    error: errorStore,
    isLoading: isLoadingStore,
  } = useSWR(`/api/store?limit=50`, fetcher);

  useEffect(() => {
    if (dataStore) {
      setAllStore(dataStore);
    }
  }, [dataStore]);
  return (
    <main className="mt-7">
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
              city={item.city}
              src={item.image}
              name={item.name}
              mitra={item.mitra}
              myRef={"store"}
            />
          ))}
      </section>
    </main>
  );
};

export default AllStore;
