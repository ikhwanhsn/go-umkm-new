import Image from "next/image";
import umkm from "../../public/img/umkm2.jpg";
import Link from "next/link";

const Outro2 = () => {
  return (
    <main className="px-24 mt-24 flex justify-between bg-orange-500 text-white py-12">
      <aside>
        <h3 className="text-3xl  font-bold mb-5">
          Lebih mudah dengan
          <br />
          goumkm
        </h3>
        <p>
          Cari produk dengan cepat dari UMKM favorit Anda
          <br />
          dengan harga yang sangat murah.
        </p>
        <Link href="/product">
          <button className="btn bg-yellow-500 text-white mt-12 border-none shadow-md hover:bg-yellow-600">
            Coba sekarang
          </button>
        </Link>
      </aside>
      <Image
        src={umkm}
        alt="umkm"
        height={450}
        width={450}
        className="rounded-md"
      />
    </main>
  );
};

export default Outro2;
