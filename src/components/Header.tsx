import Image from "next/image";
import imageHeader from "../../public/img/image-header.png";

const Header = () => {
  return (
    <main className="mx-5 mt-5">
      <section className="w-full rounded-md lg:h-3/4 md:h-[31rem] h-[45rem] bg-orange-500 text-white lg:p-28 md:p-12 p-8 relative">
        <aside className="mt-3">
          <h1 className="md:text-5xl text-3xl font-bold mb-5">
            Temukan produk UMKM
            <br />
            hanya di goumkm
          </h1>
          <h3>
            Tersedia ribuan produk siap kirim ke seluruh Indonesia
            <br />
            dengan berbagai macam kategori yang menarik dan berkualitas
            <br /> dengan harga terjangkau.
          </h3>
          <a href="#produk-unggulan">
            <button className="btn bg-yellow-500 text-white mt-5 border-none shadow-md hover:bg-yellow-600">
              Cari sekarang
            </button>
          </a>
        </aside>
        <Image
          src={imageHeader}
          alt="image-header"
          width={300}
          height={300}
          className="absolute lg:right-32 md:right-12 sm:right-5 bottom-0"
        />
      </section>
    </main>
  );
};

export default Header;
