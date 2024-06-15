import Image from "next/image";
import barusari from "../../public/img/barusari.webp";
import bulustalan from "../../public/img/bulustalan.webp";
import Link from "next/link";
import { SiGooglemaps } from "react-icons/si";
import { MdOutlineMail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";

const LokasiImage = () => {
  return (
    <main className="pt-16" id="kelurahan">
      <h1 className="text-center text-2xl text-orange-500 font-bold lg:mb-7 md:mb-6 mb-5">
        Kelurahan
      </h1>
      <section className="md:grid flex flex-col grid-cols-2 p-5 gap-5">
        <section id="barusari">
          <Image
            src={barusari}
            alt="barusari"
            width={500}
            height={500}
            className="object-cover w-full h-[20em] rounded-lg shadow-md"
          />
          <h1 className="text-center text-xl mt-5 font-semibold">
            Kelurahan Barusari
          </h1>
          <h3 className="text-center text-lg mt-1">
            Kecamatan Semarang Selatan, Kota Semarang <br /> Jawa Tengah
          </h3>
          <aside className="flex gap-2 justify-center items-center mt-3">
            <section className="border border-orange-500 p-3 text-orange-500 cursor-pointer rounded-full hover:bg-orange-500 hover:text-white">
              <SiGooglemaps />
            </section>
            <section className="border border-orange-500 p-3 text-orange-500 cursor-pointer rounded-full hover:bg-orange-500 hover:text-white">
              <MdOutlineMail size={18} />
            </section>
            <section className="border border-orange-500 p-3 text-orange-500 cursor-pointer rounded-full hover:bg-orange-500 hover:text-white">
              <BsTelephone />
            </section>
          </aside>
          <aside className="flex gap-2 justify-center items-center">
            <Link
              href="/store/k/barusari"
              className="btn bg-gray-50 border border-orange-500 text-orange-500 mt-5 shadow-md hover:bg-orange-500 hover:border-orange-500 hover:text-white"
            >
              Lihat Toko
            </Link>
            <Link
              href="/product/k/barusari"
              className="btn bg-orange-500 text-white mt-5 border-none shadow-md hover:bg-orange-600"
            >
              Lihat Produk
            </Link>
          </aside>
        </section>
        <section id="bulustalan">
          <Image
            src={bulustalan}
            alt="bulustalan"
            width={500}
            height={500}
            className="object-cover w-full h-[20em] rounded-lg shadow-md"
          />
          <h1 className="text-center text-xl mt-5 font-semibold">
            Kelurahan Bulustalan
          </h1>
          <h3 className="text-center text-lg mt-1">
            Kecamatan Semarang Selatan, Kota Semarang <br /> Jawa Tengah
          </h3>
          <aside className="flex gap-2 justify-center items-center mt-3">
            <section className="border border-orange-500 p-3 text-orange-500 cursor-pointer rounded-full hover:bg-orange-500 hover:text-white">
              <SiGooglemaps />
            </section>
            <section className="border border-orange-500 p-3 text-orange-500 cursor-pointer rounded-full hover:bg-orange-500 hover:text-white">
              <MdOutlineMail size={18} />
            </section>
            <section className="border border-orange-500 p-3 text-orange-500 cursor-pointer rounded-full hover:bg-orange-500 hover:text-white">
              <BsTelephone />
            </section>
          </aside>
          <aside className="flex gap-2 justify-center items-center">
            <Link
              href="/store/k/bulustalan"
              className="btn bg-gray-50 border border-orange-500 text-orange-500 mt-5 shadow-md hover:bg-orange-500 hover:border-orange-500 hover:text-white"
            >
              Lihat Toko
            </Link>
            <Link
              href="/product/k/bulustalan"
              className="btn bg-orange-500 text-white mt-5 border-none shadow-md hover:bg-orange-600"
            >
              Lihat Produk
            </Link>
          </aside>
        </section>
      </section>
    </main>
  );
};

export default LokasiImage;
