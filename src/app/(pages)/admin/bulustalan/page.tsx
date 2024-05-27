"use client";

import Link from "next/link";

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

const AdminBulustalan = () => {
  return (
    <main className="w-full min-h-screen lg:px-12 md:px-8 px-5 mt-5">
      <section className="flex md:flex-row flex-col justify-between md:items-center">
        <section>
          <h1 className="text-xl font-bold mb-1 capitalize">
            Dashboard Kel.Bulustalan
          </h1>
          <p>Welcome to dashboard page</p>
        </section>
        <section>
          <Link
            href={"/admin/bulustalan/create-store"}
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

export default AdminBulustalan;

type StoreCardProps = {
  name: string;
  totalProduct: number;
};

const StoreCard = ({ name, totalProduct }: StoreCardProps) => {
  return (
    <main className="flex flex-row p-5 justify-between items-center mt-2 hover:bg-gray-100 card shadow-md">
      <section className="flex gap-5">
        <h1>{name}</h1>
        <p>({totalProduct} Produk)</p>
      </section>
      <section className="flex gap-2">
        <button className="btn bg-blue-500 text-white border-none shadow-md hover:bg-blue-600">
          Lihat Toko
        </button>
      </section>
    </main>
  );
};
