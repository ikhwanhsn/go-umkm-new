"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { FiMapPin } from "react-icons/fi";

type CardProductProps = {
  src: StaticImageData;
  name: string;
  mitra: string;
  price?: string;
  myRef?: string;
};

const CardProduct = ({ src, name, mitra, price, myRef }: CardProductProps) => {
  const router = useRouter();

  return (
    <main
      className="shadow-md p-5 rounded-lg hover:bg-gray-100 transition-all cursor-pointer overflow-hidden"
      onClick={() =>
        myRef === "store" ? router.push(`/store/1`) : router.push(`/product/1`)
      }
    >
      <Image
        src={src}
        alt="image-product"
        width={300}
        height={300}
        className="mx-auto w-full h-44 rounded-sm mb-3"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="flex items-center gap-1">
        {myRef === "store" && <FiMapPin />}
        {mitra}
      </p>
      {price && (
        <p className="text-orange-500 text-lg font-semibold mt-3">{price}</p>
      )}
    </main>
  );
};

export default CardProduct;
