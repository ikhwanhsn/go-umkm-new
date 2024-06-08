"use client";

import React, { useState } from "react";

const videos = [
  {
    id: "0RbEUsmUYmY",
    title:
      "Pengusaha Muda Sukses, Omzet Sampai Miliaran Dari Jualan Dawet!! | Usaha Anak Muda",
  },
  {
    id: "z_ygJhK6uXU",
    title: "Kisah Sukses Anak Daerah Jadi Bos Ayam ! Bangun Usaha MODAL 700RB",
  },
  {
    id: "XWomJfEthUo",
    title:
      "Pengusaha Muda Sukses, Usia 25 Tahun OMZET 230 JUTA PERBULAN Dari Jualan Donat!",
  },
  {
    id: "EBFU8DsIBSE",
    title: "Baru Setahun Bisnis Berjalan Sudah Punya Omzet 900 JUTA PERBULAN",
  },
  {
    id: "bxH7ppipdpg",
    title:
      "Sukses Di Usia 23 Tahun Sebagai Petani Sayur, Sudah Hasilkan RATUSAN JUTA !!!",
  },
  {
    id: "jgJOy4AORnE",
    title:
      "Pengusaha Muda Sukses, Bangun Usaha Modal 1jt ! Kini Sukses Punya Omzet Ratusan Juta",
  },
  {
    id: "BeXwqpzBvTo",
    title:
      "Setengah MILYAR PERBULAN, Pengusaha Muda Ini Bagikan Tips Sukses Di Usia Muda !",
  },
  {
    id: "LpbOF-a-xDA",
    title:
      "MODAL 30JT JADI 28M Dalam Satu Tahun !!! Jadi Brand Fashion TERLARIS KE-3",
  },
  {
    id: "efU9W9Rm4RU",
    title:
      "Bangun Bisnis Cuma MODAL 0 Rupiah ! Hingga Sukses Punya 68 Karyawan",
  },
];

const Learn: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Menyaring video berdasarkan input pencarian
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="w-full min-h-screen px-12">
      <section className="mt-5 flex justify-between items-center">
        <section>
          <h1 className="text-xl font-bold mb-1 capitalize">Learn</h1>
          <p>Welcome to learn page</p>
        </section>
        <section className="flex gap-2 justify-between items-center mt-3 md:mt-0">
          <label className="input input-bordered flex items-center gap-2 bg-gray-50 w-full">
            <input
              type="text"
              className="w-full"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </section>
      </section>

      {filteredVideos.length === 0 && (
        <p className="text-center mt-24 italic text-sm">
          Video tidak ditemukan
        </p>
      )}
      <section className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full">
        {filteredVideos.map((video, index) => (
          <div
            key={index}
            className="relative w-full"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-md"
              src={`https://www.youtube.com/embed/${video.id}?si=NEivLnymbp5eLlHM`}
              title={`YouTube video player - ${video.title}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export default Learn;
