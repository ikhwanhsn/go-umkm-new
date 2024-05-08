import produk1 from "../../public/img/product1.png";
import CardProduct from "./CardProduct";

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
  {
    id: 9,
    image: produk1,
    name: "Kopi Hitam",
    mitra: "mitra 9",
    price: "Rp. 80.000",
  },
  {
    id: 10,
    image: produk1,
    name: "Nasi Jagung",
    mitra: "mitra 10",
    price: "Rp. 20.000",
  },
];

const AllProduct = () => {
  return (
    <main className="mt-7">
      <section className="grid grid-cols-5 mx-auto mt-7 gap-5">
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

export default AllProduct;
