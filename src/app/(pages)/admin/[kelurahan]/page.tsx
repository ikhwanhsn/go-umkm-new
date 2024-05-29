"use client";

import Link from "next/link";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const dataToko = [
  {
    id: 1,
    name: "Toko 1",
    totalProduct: 10,
  },
  {
    id: 2,
    name: "Toko 2",
    totalProduct: 20,
  },
  {
    id: 3,
    name: "Toko 3",
    totalProduct: 30,
  },
  {
    id: 4,
    name: "Toko 4",
    totalProduct: 40,
  },
  {
    id: 5,
    name: "Toko 5",
    totalProduct: 50,
  },
];

const Admin = () => {
  const { kelurahan } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (
      !kelurahan ||
      (kelurahan !== "barusari" && kelurahan !== "bulustalan")
    ) {
      router.push("/404");
    }
  }, [kelurahan]);

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
      {dataToko.map((toko) => (
        <StoreCard
          key={toko.id}
          name={toko.name}
          totalProduct={toko.totalProduct}
        />
      ))}
    </main>
  );
};

export default Admin;

type StoreCardProps = {
  name: string;
  totalProduct: number;
};

const StoreCard = ({ name, totalProduct }: StoreCardProps) => {
  return (
    <main className="flex flex-row p-5 justify-between items-center mt-2 hover:bg-gray-100 card shadow-md">
      <section className="flex gap-3 items-center">
        <IoStorefrontOutline size={30} />
        <h1>{name}</h1>
        <p>({totalProduct} Produk)</p>
      </section>
      <section className="flex gap-2">
        <Link
          href={`/admin/store/1`}
          className="btn bg-blue-500 text-white border-none shadow-md hover:bg-blue-600"
        >
          Lihat Produk
        </Link>
        <Link
          href={`/admin/store/edit/1`}
          className="btn bg-yellow-500 text-white border-none shadow-md hover:bg-yellow-600"
        >
          <FaRegEdit size={20} />
        </Link>
        <button className="btn bg-red-500 text-white border-none shadow-md hover:bg-red-600">
          <MdDeleteOutline size={23} />
        </button>
      </section>
    </main>
  );
};
