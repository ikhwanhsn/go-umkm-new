"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import image1 from "../../../../../../public/img/product1.jpg";

const ListProduct = () => {
  return (
    <main className="lg:mx-12 md:mx-8 mx-5 mt-5 min-h-screen">
      <section className="flex justify-between items-center">
        <section>
          <h1 className="text-xl font-bold mb-1 capitalize">
            List Product (toko barokah)
          </h1>
          <p>Welcome to list product page</p>
        </section>
        <section>
          <Link
            href="/admin/product/create/1"
            className="btn bg-orange-500 text-white border-none hover:bg-orange-600"
          >
            Tambah Produk
          </Link>
        </section>
      </section>
      <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto mt-3 lg:gap-5 md:gap-4 gap-3">
        <MyProducts
          key={"1"}
          id={"1"}
          src={image1}
          name={"Product 1"}
          price={"100.000"}
        />
      </section>
    </main>
  );
};

export default ListProduct;

type MyProductsProps = {
  id: string;
  src: StaticImageData;
  name: string;
  price: string;
};

const MyProducts = ({ id, src, name, price }: MyProductsProps) => {
  const router = useRouter();

  return (
    <main
      className="shadow-md p-5 rounded-lg hover:bg-gray-100 transition-all cursor-pointer overflow-hidden"
      onClick={() => router.push(`/admin/product/edit/1`)}
    >
      <Image
        src={src}
        alt="image-product"
        width={300}
        height={300}
        className="mx-auto w-full lg:h-44 md:h-52 h-32 rounded-sm mb-3 object-cover"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      {price && (
        <p className="text-orange-500 text-lg font-semibold mt-1">Rp{price}</p>
      )}
    </main>
  );
};
