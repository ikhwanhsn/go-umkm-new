const VisiMisi = () => {
  return (
    <main className="mt-12">
      <h1 className="text-center text-2xl text-orange-500 font-bold lg:mb-7 md:mb-6 mb-5">
        Visi & Misi
      </h1>
      <p className="text-center w-3/4 mx-auto">
        Kami bertekad untuk membantu UMKM berkembang dengan memberikan solusi
        digital yang inovatif. Melalui kolaborasi, kreativitas, dan
        keberlanjutan, kami berkomitmen untuk menjadi mitra terpercaya bagi para
        UMKM.
      </p>
      <section className="md:grid block space-y-2 md:space-y-0 grid-cols-2 gap-5 mt-7 lg:w-4/5 md:w-full w-full mx-auto px-5 lg:px-0">
        <aside className="gap-5 bg-white shadow-md rounded-xl p-8 flex">
          <section>
            <h3 className="text-lg font-bold">Visi</h3>
            <ul className="list-disc ml-5">
              <li>
                Menjadi platform digital terkemuka yang memberdayakan UMKM untuk
                berkembang dan bersaing di pasar global.
              </li>
              <li>
                Mendukung pertumbuhan ekonomi lokal dengan mendorong
                digitalisasi dan pemberdayaan UMKM.
              </li>
              <li>
                Menjadi jembatan utama yang menghubungkan UMKM dengan pasar
                global melalui inovasi teknologi dan layanan berkualitas.
              </li>
            </ul>
          </section>
        </aside>
        <aside className="gap-5 bg-white shadow-md rounded-xl p-8 flex">
          <section>
            <h3 className="text-lg font-bold">Misi</h3>
            <ul className="list-disc ml-5">
              <li>
                Memberikan akses mudah dan cepat bagi UMKM untuk memasarkan
                produk mereka secara online.
              </li>
              <li>
                Menyediakan pelatihan dan sumber daya untuk meningkatkan
                keterampilan dan kapasitas bisnis UMKM.
              </li>
              <li>
                Membangun komunitas yang saling mendukung di antara para pelaku
                UMKM.
              </li>
            </ul>
          </section>
        </aside>
      </section>
    </main>
  );
};

export default VisiMisi;
