import Image from "next/image";
import map from "../../public/img/map-location.png";

const Lokasi = () => {
  return (
    <main className="mt-12 bg-orange-500 text-white px-44 flex justify-between w-full h-80 items-center relative">
      <Image
        src={map}
        alt="map-location"
        width={230}
        height={230}
        className="absolute left-0 top-0 z-0"
      />
      <section className="z-10">
        <h2 className="text-5xl mb-7 font-bold">
          Pilih Lokasi
          <br />
          UMKM
        </h2>
        <p>
          Temukan ratusan UMKM di area Anda dengan berbagai
          <br /> macam produk yang bisa Anda pilih.
        </p>
      </section>
      <section className="flex flex-col gap-7">
        <button className="btn bg-white w-44 border-none shadow-md hover:bg-gray-300 text-xl text-orange-500">
          Barusari
        </button>
        <button className="btn bg-white w-44 border-none shadow-md hover:bg-gray-300 text-xl text-orange-500">
          Bulustalan
        </button>
      </section>
    </main>
  );
};

export default Lokasi;
