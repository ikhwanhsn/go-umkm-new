"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

type CardProductProps = {
  src: StaticImageData;
  name: string;
  mitra: string;
  price: string;
};

const CardProduct = ({ src, name, mitra, price }: CardProductProps) => {
  const router = useRouter();

  return (
    <main
      className="shadow-md p-5 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
      onClick={() => router.push(`/product/1`)}
    >
      <Image
        src={src}
        alt="image-product"
        width={120}
        height={120}
        className="mx-auto"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p>{mitra}</p>
      <p className="text-orange-500 text-lg font-semibold mt-3">{price}</p>
    </main>
  );
};

export default CardProduct;
