import Image from "next/image";
import umkm from "../../public/img/umkm1.jpg";
import Link from "next/link";

const Outro1 = () => {
  return (
    <main className="lg:mx-24 md:px-12 px-12 mt-24 flex md:flex-row flex-col md:gap-16 gap-12">
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
        <Link href="/store/k/barusari">
          <button className="btn bg-orange-500 text-white lg:mt-12 md:mt-8 mt-6 border-none shadow-md hover:bg-orange-600">
            Cari sekarang
          </button>
        </Link>
      </aside>
    </main>
  );
};

export default Outro1;
