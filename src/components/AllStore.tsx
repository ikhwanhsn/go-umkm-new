import store1 from "../../public/img/store1.jpg";
import store2 from "../../public/img/store2.jpg";
import store3 from "../../public/img/store3.jpg";
import store4 from "../../public/img/store4.jpg";
import store5 from "../../public/img/store5.jpg";
import store6 from "../../public/img/store6.jpg";
import store7 from "../../public/img/store7.jpg";
import store8 from "../../public/img/store8.jpg";
import store9 from "../../public/img/store9.jpg";
import store10 from "../../public/img/store10.jpg";
import CardProduct from "./CardProduct";

const dataStore = [
  {
    id: 1,
    image: store1,
    name: "Underground",
    mitra: "Semarang",
  },
  {
    id: 2,
    image: store2,
    name: "Spar",
    mitra: "Surabaya",
  },
  {
    id: 3,
    image: store3,
    name: "Tea",
    mitra: "Jakarta",
  },
  {
    id: 4,
    image: store4,
    name: "Mc Donalds",
    mitra: "Bandung",
  },
  {
    id: 5,
    image: store5,
    name: "Metro",
    mitra: "Yogyakarta",
  },
  {
    id: 6,
    image: store6,
    name: "Starbucks",
    mitra: "Semarang",
  },
  {
    id: 7,
    image: store7,
    name: "Nivy",
    mitra: "Lampung",
  },
  {
    id: 8,
    image: store8,
    name: "Jake Bar",
    mitra: "Bandung",
  },
  {
    id: 9,
    image: store9,
    name: "Frankies",
    mitra: "Sumatera",
  },
  {
    id: 10,
    image: store10,
    name: "Crown Burger",
    mitra: "Jakarta",
  },
];

const AllStore = () => {
  return (
    <main className="mt-7">
      <section className="grid grid-cols-5 mx-auto mt-7 gap-5">
        {dataStore.map((item) => (
          <CardProduct
            key={item.id}
            src={item.image}
            name={item.name}
            mitra={item.mitra}
            myRef={"store"}
          />
        ))}
      </section>
    </main>
  );
};

export default AllStore;
