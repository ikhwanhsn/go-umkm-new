"use client";

import Link from "next/link";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetcher } from "@/libs/swr/fetcher";
import useSWR from "swr";
import Swal from "sweetalert2";

const Admin = () => {
  const [store, setStore] = useState([]);
  const { kelurahan } = useParams();
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    `/api/store/k/${kelurahan}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setStore(data);
    }
  }, [data]);

  useEffect(() => {
    if (
      !kelurahan ||
      (kelurahan !== "barusari" && kelurahan !== "bulustalan")
    ) {
      router.push("/404");
    }
  }, [kelurahan]);

  const handleDeleteStore = (id: any) => {
    setStore((prevStore) => prevStore.filter((toko: any) => toko._id !== id));
  };

  return (
    <main className="w-full min-h-screen lg:px-12 md:px-8 px-5 mt-5">
      <section className="flex md:flex-row flex-col justify-between md:items-center">
        <section>
          <h1 className="text-xl font-bold mb-1 capitalize">
            Dashboard Kel.{kelurahan}
          </h1>
          <p>Welcome to dashboard page</p>
        </section>
        <section className="flex gap-2">
          <label className="input input-bordered flex items-center gap-2 bg-gray-50 w-full">
            <input
              type="text"
              className="w-full"
              placeholder="Search here..."
              value={""}
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
          <Link
            href={`/admin/store/create/${kelurahan}`}
            className="btn bg-orange-500 text-white border-none shadow-md hover:bg-orange-600"
          >
            Tambah Toko
          </Link>
        </section>
      </section>
      {store.length > 0 &&
        store.map((toko: any) => (
          <StoreCard
            key={toko._id}
            storeId={toko._id}
            name={toko.name}
            totalProduct={toko.totalProduct || 0}
            onDelete={handleDeleteStore}
          />
        ))}
    </main>
  );
};

export default Admin;

type StoreCardProps = {
  name: string;
  totalProduct: number;
  storeId: string;
  onDelete: (id: string) => void;
};

const StoreCard = ({
  name,
  totalProduct,
  storeId,
  onDelete,
}: StoreCardProps) => {
  const deleteStore = async (id: string) => {
    try {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: `Toko ${name} akan di hapus secara permanen!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`/api/store?id=${id}`, {
            method: "DELETE",
          });
          if (!res.ok) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Toko gagal di hapus!",
            });
            return;
          }
          if (res.ok) {
            Swal.fire({
              title: "Success!",
              text: "Toko berhasil di hapus!",
              icon: "success",
            });
            onDelete(id);
          }
        }
      });
    } catch (error) {
      console.error(error);
      alert("Failed to delete store");
    }
  };

  return (
    <main className="flex flex-row p-5 justify-between items-center mt-2 hover:bg-gray-100 card shadow-md">
      <section className="flex gap-3 items-center">
        <IoStorefrontOutline size={30} />
        <h1 className="capitalize">{name}</h1>
        <p>({totalProduct} Produk)</p>
      </section>
      <section className="flex gap-2">
        <Link
          href={{
            pathname: `/admin/store/${storeId}`,
            query: { name },
          }}
          className="btn bg-blue-500 text-white border-none shadow-md hover:bg-blue-600"
        >
          Lihat Produk
        </Link>
        <Link
          href={`/admin/store/edit/${storeId}`}
          className="btn bg-yellow-500 text-white border-none shadow-md hover:bg-yellow-600"
        >
          <FaRegEdit size={20} />
        </Link>
        <button
          className="btn bg-red-500 text-white border-none shadow-md hover:bg-red-600"
          type="button"
          onClick={() => deleteStore(storeId)}
        >
          <MdDeleteOutline size={23} />
        </button>
      </section>
    </main>
  );
};
