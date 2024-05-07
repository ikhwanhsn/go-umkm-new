import Image, { StaticImageData } from "next/image";
import produk1 from "../../public/img/product1.png";

const dataProduk = [
  {
    id: 1,
    image: produk1,
    name: "Kopi Lorepsipa",
    mitra: "Nama mitra 1",
    price: "Rp. 71.000",
  },
  {
    id: 2,
    image: produk1,
    name: "Teh Serenili",
    mitra: "Nama mitra 2",
    price: "Rp. 72.000",
  },
  {
    id: 3,
    image: produk1,
    name: "Minuman Coklat Beraroma",
    mitra: "Nama mitra 3",
    price: "Rp. 73.500",
  },
  {
    id: 4,
    image: produk1,
    name: "Sari Buah Segar",
    mitra: "Nama mitra 4",
    price: "Rp. 65.000",
  },
  {
    id: 5,
    image: produk1,
    name: "Es Krim Homemade",
    mitra: "Nama mitra 5",
    price: "Rp. 80.000",
  },
  {
    id: 6,
    image: produk1,
    name: "Kue Tradisional",
    mitra: "Nama mitra 6",
    price: "Rp. 45.000",
  },
  {
    id: 7,
    image: produk1,
    name: "Jus Segar 100% Buah Lokal",
    mitra: "Nama mitra 7",
    price: "Rp. 55.000",
  },
  {
    id: 8,
    image: produk1,
    name: "Smoothie Sayur Organik",
    mitra: "Nama mitra 8",
    price: "Rp. 60.000",
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
    <main className="shadow-md p-5 rounded-lg hover:bg-gray-100 transition-all cursor-pointer">
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
