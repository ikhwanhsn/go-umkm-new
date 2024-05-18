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
  } = useSWR(`/api/store`, fetcher);

  useEffect(() => {
    if (dataStore) {
      setAllStore(dataStore);
    }
  }, [dataStore]);
  return (
    <main className="mt-7">
      <section className="grid grid-cols-5 mx-auto mt-7 gap-5">
        {allStore.length > 0 &&
          allStore.map((item: any) => (
            <CardProduct
              key={item.id}
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
