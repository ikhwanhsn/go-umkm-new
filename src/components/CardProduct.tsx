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
      className="shadow-md md:p-5 p-4 rounded-lg hover:bg-gray-100 transition-all cursor-pointer overflow-hidden"
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
        className="mx-auto w-full aspect-square rounded-sm mb-3 object-cover"
      />
      <h3 className="text-lg font-semibold capitalize line-clamp-2">{name}</h3>
      <p className="grid grid-cols-12 items-center gap-1 capitalize line-clamp-1">
        {myRef === "store" && (
          <>
            <FiMapPin size={17} />
            <span className="col-span-11 ml-3 md:ml-2">{city}</span>
          </>
        )}
        {myRef === "product" && (
          <IoStorefrontOutline size={17} className="col-span-1" />
        )}
        <span className="truncate col-span-11 ml-2">{mitra}</span>
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
