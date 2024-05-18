import Image from "next/image";
import produk1 from "../../../../../public/img/product1.jpg";
import CardProduct from "@/components/CardProduct";
import { dataProduct } from "@/services/dataDummy/dataProduct";

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

const SimilarProduct = () => {
  return (
    <main>
      <h1 className="text-xl font-bold mb-1">Similar Product</h1>
      <section className="grid grid-cols-5 mx-auto mt-3 gap-5">
        {dataProduct.map((item) => (
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
