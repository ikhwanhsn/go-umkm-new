import Image from "next/image";
import imageHeader from "../../public/img/image-header.png";

const Header = () => {
  return (
    <main className="mx-5 mt-5">
      <section className="w-full rounded-md h-[30rem] bg-orange-500 text-white p-28 relative">
        <aside className="mt-8">
          <h1 className="text-5xl font-bold mb-5">
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
        </aside>
        <Image
          src={imageHeader}
          alt="image-header"
          width={300}
          height={300}
          className="absolute right-32 top-[90px]"
        />
      </section>
    </main>
  );
};

export default Header;
