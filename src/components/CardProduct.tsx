"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { FiMapPin } from "react-icons/fi";
import { IoStorefrontOutline } from "react-icons/io5";

type CardProductProps = {
  src: StaticImageData;
  id: string;
  name: string;
  city?: string;
  mitra: string;
  price?: string;
  myRef?: string;
};

const CardProduct = ({
  id,
  src,
  name,
  city,
  mitra,
  price,
  myRef,
}: CardProductProps) => {
  const router = useRouter();

  return (
    <main
      className="shadow-md p-5 rounded-lg hover:bg-gray-100 transition-all cursor-pointer overflow-hidden"
      onClick={() =>
        myRef === "store"
          ? router.push(`/store/${id}`)
          : router.push(`/product/${id}`)
      }
    >
      <Image
        src={src}
        alt="image-product"
        width={300}
        height={300}
        className="mx-auto w-full lg:h-44 md:h-40 h-32 rounded-sm mb-3 object-cover"
      />
      <h3 className="text-lg font-semibold capitalize">{name}</h3>
      <p className="flex items-center gap-1 capitalize">
        {myRef === "store" && (
          <>
            <FiMapPin />
            {city}
          </>
        )}
        {myRef === "product" && <IoStorefrontOutline />}
        {mitra}
      </p>
      {price && (
        <p className="text-orange-500 text-lg font-semibold mt-3">
          Rp{price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </p>
      )}
    </main>
  );
};

export default CardProduct;
