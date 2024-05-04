import Image from "next/image";
import umkm from "../../public/img/umkm1.jpg";

const Outro1 = () => {
  return (
    <main className="mx-24 mt-24 flex gap-16">
      <Image
        src={umkm}
        alt="umkm"
        height={450}
        width={450}
        className="rounded-md"
      />
      <aside>
        <h3 className="text-3xl text-orange-500 font-bold mb-5">
          Beragam UMKM
          <br />
          hanya disini
        </h3>
        <p>
          Lebih dari 100 UMKM dengan ribuan produk yang ada siap melayani
          pesanan Anda.
        </p>
        <button className="btn bg-orange-500 text-white mt-12 border-none shadow-md hover:bg-orange-600">
          Cari sekarang
        </button>
      </aside>
    </main>
  );
};

export default Outro1;
