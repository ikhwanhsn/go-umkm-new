import Image, { StaticImageData } from "next/image";
import produk1 from "../../public/img/product1.png";

const dataProduk = [
  {
    id: 1,
    image: produk1,
    name: "Kopi Lorepsipa",
    mitra: "Nama mitra",
    price: "Rp. 71.000",
  },
  {
    id: 2,
    image: produk1,
    name: "Kopi Lorepsipa",
    mitra: "Mitra mitra",
    price: "Rp. 71.000",
  },
  {
    id: 3,
    image: produk1,
    name: "Kopi Lorepsipa",
    mitra: "Mitra mitra",
    price: "Rp. 71.000",
  },
  {
    id: 4,
    image: produk1,
    name: "Kopi Lorepsipa",
    mitra: "Mitra mitra",
    price: "Rp. 71.000",
  },
  {
    id: 5,
    image: produk1,
    name: "Kopi Lorepsipa",
    mitra: "Mitra mitra",
    price: "Rp. 71.000",
  },
  {
    id: 6,
    image: produk1,
    name: "Kopi Lorepsipa",
    mitra: "Mitra mitra",
    price: "Rp. 71.000",
  },
  {
    id: 7,
    image: produk1,
    name: "Kopi Lorepsipa",
    mitra: "Mitra mitra",
    price: "Rp. 71.000",
  },
  {
    id: 8,
    image: produk1,
    name: "Kopi Lorepsipa",
    mitra: "Mitra mitra",
    price: "Rp. 71.000",
  },
];

const ProdukUnggulan = () => {
  return (
    <main className="mt-12">
      <h1 className="text-center text-2xl text-orange-500 font-bold">
        Produk Unggulan
      </h1>
      <section className="grid grid-cols-4 px-24 mx-auto mt-7 gap-7">
        {dataProduk.map((item) => (
          <CardProduct
            key={item.id}
            src={item.image}
            name={item.name}
            mitra={item.mitra}
            price={item.price}
          />
        ))}
      </section>
    </main>
  );
};

export default ProdukUnggulan;

type CardProductProps = {
  src: StaticImageData;
  name: string;
  mitra: string;
  price: string;
};

const CardProduct = ({ src, name, mitra, price }: CardProductProps) => {
  return (
    <main className="shadow-md p-5 rounded-lg">
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
