import Image from "next/image";
import map from "../../public/img/map-location.png";

const Lokasi = () => {
  return (
    <main className="mt-12 bg-orange-500 text-white lg:px-44 md:px-20 px-8 md:py-0 py-12 flex md:flex-row flex-col justify-between w-full md:h-80 h-96 items-center relative">
      <Image
        src={map}
        alt="map-location"
        width={230}
        height={230}
        className="absolute left-0 bottom-0 z-0"
      />
      <section className="z-10">
        <h2 className="text-5xl mb-7 font-bold">
          Pilih Lokasi
          <br />
          UMKM
        </h2>
        <p className="lg:max-w-lg md:max-w-md">
          Temukan ratusan UMKM di area Anda dengan berbagai macam produk yang
          bisa Anda pilih.
        </p>
      </section>
      <section className="flex md:flex-col flex-row md:gap-7 gap-3 z-10">
        <a
          href="#barusari"
          className="btn bg-white hover:bg-gray-200 md:w-44 w-40 border-none shadow-md px-5 py-3 rounded-md font-bold text-xl text-orange-500"
        >
          Barusari
        </a>
        <a
          href="#bulustalan"
          className="btn bg-white hover:bg-gray-200 md:w-44 w-40 border-none shadow-md px-5 py-3 rounded-md font-bold text-xl text-orange-500"
        >
          Bulustalan
        </a>
      </section>
    </main>
  );
};

export default Lokasi;
