import Image from "next/image";
import produk1 from "../../../../../public/img/product1.jpg";
import produk2 from "../../../../../public/img/product2.jpg";
import produk3 from "../../../../../public/img/product3.jpg";
import produk4 from "../../../../../public/img/product4.jpg";
import produk5 from "../../../../../public/img/product5.jpg";
import produk6 from "../../../../../public/img/product6.jpg";
import produk7 from "../../../../../public/img/product7.jpg";
import produk8 from "../../../../../public/img/product8.jpg";
import produk9 from "../../../../../public/img/product9.jpg";
import produk10 from "../../../../../public/img/product10.jpg";
import CardProduct from "@/components/CardProduct";

const DetailProduct = () => {
  return (
    <main className="min-h-screen px-12 mt-5">
      <h1 className="text-xl font-bold mb-1">Detail Product</h1>
      <section className="flex flex-row mt-3 mb-5">
        <section className="basis-5/12">
          <Image src={produk1} alt="image-product" width={200} height={200} />
        </section>
        <aside className="basis-7/12">
          <h2 className="text-xl font-semibold mb-3">Coffe Essence</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa
            recusandae ad perferendis reiciendis aspernatur alias nihil vel
            dignissimos qui eos corrupti, eveniet dicta impedit asperiores
            labore officiis tempore, iste repellat minus reprehenderit. Qui, sed
            quisquam id voluptates harum officia, tempora velit, sequi voluptas
            mollitia vero sapiente fuga doloremque. Vero, ducimus.
          </p>
          <section className="space-x-1 mt-5">
            <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
              Chat penjual
            </button>
            <button className="btn bg-orange-500 text-white border-none hover:bg-orange-600">
              Beli sekarang
            </button>
          </section>
        </aside>
      </section>
      <SimilarProduct />
    </main>
  );
};

export default DetailProduct;

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
    image: produk2,
    name: "Teh Serenili",
    mitra: "Nama mitra 2",
    price: "Rp. 72.000",
  },
  {
    id: 3,
    image: produk3,
    name: "Minuman Coklat Beraroma",
    mitra: "Nama mitra 3",
    price: "Rp. 73.500",
  },
  {
    id: 4,
    image: produk4,
    name: "Sari Buah Segar",
    mitra: "Nama mitra 4",
    price: "Rp. 65.000",
  },
  {
    id: 5,
    image: produk5,
    name: "Es Krim Homemade",
    mitra: "Nama mitra 5",
    price: "Rp. 80.000",
  },
  {
    id: 6,
    image: produk6,
    name: "Kue Tradisional",
    mitra: "Nama mitra 6",
    price: "Rp. 45.000",
  },
  {
    id: 7,
    image: produk7,
    name: "Jus Segar 100% Buah Lokal",
    mitra: "Nama mitra 7",
    price: "Rp. 55.000",
  },
  {
    id: 8,
    image: produk8,
    name: "Smoothie Sayur Organik",
    mitra: "Nama mitra 8",
    price: "Rp. 60.000",
  },
  {
    id: 9,
    image: produk9,
    name: "Kopi Hitam",
    mitra: "mitra 9",
    price: "Rp. 80.000",
  },
  {
    id: 10,
    image: produk10,
    name: "Nasi Jagung",
    mitra: "mitra 10",
    price: "Rp. 20.000",
  },
];

const SimilarProduct = () => {
  return (
    <main>
      <h1 className="text-xl font-bold mb-1">Similar Product</h1>
      <section className="grid grid-cols-5 mx-auto mt-3 gap-5">
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
