"use client";

import CountUp from "react-countup";

const JumlahPengunjung = () => {
  return (
    <main className="w-full h-full bg-orange-500 py-20 mt-12 px-64 flex justify-between items-center text-white">
      <h1 className="text-3xl font-bold">
        Jumlah <br />
        Pengguna
      </h1>
      <section className="ml-24">
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
    </main>
  );
};

export default JumlahPengunjung;
