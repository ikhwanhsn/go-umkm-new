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
import { AiOutlineProduct } from "react-icons/ai";

const statsData = [
  {
    title: "Pengunjung",
    value: "52K",
    desc: "Jan 1st - Feb 1st",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-8 h-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        ></path>
      </svg>
    ),
  },
  {
    title: "Pengguna Baru",
    value: "7,800",
    desc: "↗︎ 1,200 (18%)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-8 h-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 11V5m0 0L7.05 9.95M12 5l4.95 4.95M12 19a7 7 0 100-14 7 7 0 000 14z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Total Pengguna",
    value: "32,000",
    desc: "↘︎ 1,500 (4%)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-8 h-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 11c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-2a3 3 0 100-6 3 3 0 000 6zm0 7c1.66 0 3-1.34 3-3S13.66 10 12 10 9 11.34 9 13s1.34 3 3 3z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Total Toko",
    value: "2,150",
    desc: "↗︎ 50 (2%)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-8 h-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h16v6H4v-6zm2 6h12v2H6v-2z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Total Produk",
    value: "10,320",
    desc: "↗︎ 300 (3%)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-8 h-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 2L2 7l10 5 10-5-10-5zm0 18l-10-5V9l10 5 10-5v6l-10 5zm-10-9.5v6L12 20l10-6v-6L12 11 2 10.5z"
        ></path>
      </svg>
    ),
  },
];

const Admin = () => {
  const [store, setStore] = useState([]);
  const { kelurahan } = useParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, error, isLoading } = useSWR(
    `/api/store?limit=50&kelurahan=${kelurahan}&search=${searchTerm}`,
    fetcher
  );

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
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
          <Link
            href={`/admin/store/create/${kelurahan}`}
            className="btn bg-orange-500 text-white border-none shadow-md hover:bg-orange-600"
          >
            Tambah Toko
          </Link>
        </section>
      </section>
      <section className="mt-3 mx-auto w-full">
        <div className="stats shadow w-full bg-orange-500 text-white">
          {statsData.map((stat, index) => (
            <div key={index} className="stat">
              <div className="stat-figure text-gray-100">{stat.icon}</div>
              <div className="stat-title text-gray-100">{stat.title}</div>
              <div className="stat-value text-white">{stat.value}</div>
              <div className="stat-desc text-gray-100">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>
      {isLoading && <p className="text-center mt-12">Loading...</p>}
      {store.length === 0 && !isLoading && (
        <p className="text-center mt-12">Toko tidak ditemukan</p>
      )}
      {store.length > 0 &&
        !isLoading &&
        store.map((toko: any) => (
          <StoreCard
            key={toko._id}
            storeId={toko._id}
            name={toko.name}
            totalProduct={toko.totalProducts}
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
        <p className="hidden md:block">({totalProduct} Produk)</p>
      </section>
      <section className="flex gap-2">
        <Link
          href={{
            pathname: `/admin/store/${storeId}`,
            query: { name },
          }}
          className="btn bg-blue-500 text-white border-none shadow-md hover:bg-blue-600"
        >
          <p className="hidden md:block">Lihat Produk</p>
          <AiOutlineProduct className="md:hidden block" size={20} />
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
