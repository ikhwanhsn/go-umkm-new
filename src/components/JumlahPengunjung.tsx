"use client";

import CountUp from "react-countup";

const JumlahPengunjung = () => {
  return (
    <main className="w-full h-full bg-orange-500 md:py-20 py-12 mt-12 lg:px-64 md:px-20 px-12 flex justify-between items-center text-white">
      <h1 className="text-3xl font-bold">
        Jumlah <br />
        Pengguna
      </h1>
      <section className="md:flex block gap-12 items-center text-center space-y-2 md:space-y-0">
        <section>
          <h2 className="text-3xl font-semibold">
            +
            <CountUp
              start={700}
              end={1000}
              duration={3}
              scrollSpyOnce={true}
              enableScrollSpy={true}
            />
          </h2>
          <p className="text-lg">Pengunjung</p>
        </section>
        <section>
          <h2 className="text-3xl font-semibold">
            +
            <CountUp
              start={30}
              end={50}
              duration={3}
              scrollSpyOnce={true}
              enableScrollSpy={true}
            />
          </h2>
          <p className="text-lg">Produk</p>
        </section>
        <section>
          <h2 className="text-3xl font-semibold">
            +
            <CountUp
              start={5}
              end={10}
              duration={3}
              scrollSpyOnce={true}
              enableScrollSpy={true}
            />
          </h2>
          <p className="text-lg">Penjual</p>
        </section>
      </section>
    </main>
  );
};

export default JumlahPengunjung;
