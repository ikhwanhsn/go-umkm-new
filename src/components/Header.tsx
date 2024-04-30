import Image from "next/image";
import imageHeader from "../../public/img/image-header.png";

const Header = () => {
  return (
    <main className="mx-12 mt-5">
      <section className="w-full rounded-md h-[30rem] bg-orange-500 text-white p-20 relative">
        <aside className="mt-20">
          <h1 className="text-5xl font-bold mb-5">
            Temukan produk UMKM
            <br />
            hanya di goumkm
          </h1>
          <h3>
            Tersedia ribuan produk siap kirim ke seluruh Indonesia dengan
            berbagai macam
            <br />
            kategori yang menarik dan berkualitas dengan harga terjangkau.
          </h3>
        </aside>
        <Image
          src={imageHeader}
          alt="image-header"
          width={300}
          height={300}
          className="absolute right-24 top-[90px]"
        />
      </section>
    </main>
  );
};

export default Header;
