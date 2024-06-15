import Image from "next/image";
import mentor from "../../../../public/img/mentor.webp";
import team1 from "../../../../public/img/team-p-1.webp";
import team2 from "../../../../public/img/team-l-1.webp";
import team3 from "../../../../public/img/team-p-2.webp";
import team4 from "../../../../public/img/team-l-2.webp";
import bg1 from "../../../../public/img/bg-team-1.webp";
import bg2 from "../../../../public/img/bg-team-2.webp";
import bg3 from "../../../../public/img/bg-team-3.webp";
import bg4 from "../../../../public/img/bg-team-4.webp";
import dok1 from "../../../../public/img/dok1.webp";
import dok2 from "../../../../public/img/dok2.webp";
import dok3 from "../../../../public/img/dok3.webp";
import dok4 from "../../../../public/img/dok4.webp";
import dok5 from "../../../../public/img/dok5.webp";
import dok6 from "../../../../public/img/dok6.webp";
import dok7 from "../../../../public/img/dok7.webp";
import dok8 from "../../../../public/img/dok8.webp";
import dok9 from "../../../../public/img/dok9.webp";
import { MdOutlineMail } from "react-icons/md";
import { TbBrandTelegram } from "react-icons/tb";
import { IoChatbubbleEllipsesOutline, IoLogoInstagram } from "react-icons/io5";
import barusari from "../../../../public/img/barusari.webp";
import bulustalan from "../../../../public/img/bulustalan.webp";
import { SiGooglemaps } from "react-icons/si";
import { BsTelephone } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";

const team = [
  {
    image: team1,
    name: "Sekar Cinta Amaria",
    role: "Ketua",
    background: bg1,
  },
  {
    image: team2,
    name: "Ikhwanul Husna",
    role: "Anggota",
    background: bg2,
  },
  {
    image: team3,
    name: "Hetta Rachma",
    role: "Anggota",
    background: bg3,
  },
  {
    image: team4,
    name: "Pramudya Shaka Nugraha",
    role: "Anggota",
    background: bg4,
  },
];

const documentation = [
  {
    image: dok2,
    name: "Dokumentasi 1",
  },
  {
    image: dok3,
    name: "Dokumentasi 2",
  },
  {
    image: dok4,
    name: "Dokumentasi 3",
  },
  {
    image: dok5,
    name: "Dokumentasi 4",
  },
  {
    image: dok7,
    name: "Dokumentasi 5",
  },
  {
    image: dok1,
    name: "Dokumentasi 6",
  },
  {
    image: dok9,
    name: "Dokumentasi 7",
  },
];

const About = () => {
  return (
    <main className="w-full min-h-screen mt-5 rounded-md">
      <center className="bg-orange-500 mx-5 text-white lg:px-12 md:px-5 lg:py-28 md:py-24 py-20 rounded-md relative h-3/4">
        <p className="uppercase text-sm">About Us</p>
        <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold mt-7 lg:max-w-4xl md:max-w-2xl max-w-sm">
          Misi kami adalah membantu UMKM tumbuh bersama kami
        </h1>
        <p className="mt-7 lg:mx-44 md:mx-24 mx-12">
          GoUMKM merupakan platform yang membantu UMKM untuk berkembang dan
          lebih efisien dengan teknologi yang kami tawarkan, kami berusaha
          membantu mereka yang mempunyai kesulitan menggunakan platform digital
          untuk berjualan dengan menyediakan aplikasi yang mudah digunakan.
        </p>
      </center>
      {/* Our Mentor */}
      <section>
        <h1 className="text-2xl font-bold text-center mt-12 text-orange-600">
          Our Mentor
        </h1>
        <section className="mt-8 px-5 md:px-0">
          <center>
            <section className="bg-white p-5 rounded-md md:w-64 w-full shadow-md mx-auto md:mx-0">
              <Image
                src={mentor}
                alt="mentor"
                width={210}
                height={210}
                className="rounded-sm w-full"
              />
              <section className="text-center mt-5">
                <h2 className="font-semibold">Puri Muliandhi, S.T., M.T.</h2>
                <p className="text-sm mt-1">Dosen Teknik Elektro</p>
                <p className="text-sm">Universitas Semarang</p>
              </section>
            </section>
          </center>
          {/* <aside className="mx-3 md:mx-0">
            <h2 className="text-xl font-semibold">Visi GoUMKM</h2>
            <p className="mt-1">
              GoUMKM sebagai platform yang membantu para UMKM untuk
              mengembangkan usaha mereka, kami menyediakan aplikasi yang mudah
              digunakan dan memiliki banyak fitur yang bisa dimanfaatkan para
              UMKM untuk mempromosikan usaha mereka.
            </p>
            <h2 className="text-xl font-semibold mt-3">Misi GoUMKM</h2>
            <p className="mt-1">
              Membantu para UMKM untuk tumbuh dan berkembang dengan memanfaatkan
              teknologi yang ada.
            </p>
          </aside> */}
        </section>
      </section>
      {/* Our Team */}
      <section className="mt-24 mx-5">
        <h1 className="text-2xl font-bold text-center text-orange-600">
          Our Team
        </h1>
        <center>
          <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-between items-center mt-12 md:mx-12 mx-3 lg:gap-5 md:gap-12 gap-y-12">
            {team.map((item) => (
              <section key={item.name} className="relative">
                <section className="lg:w-64 md:w-full object-cover overflow-hidden h-44 z-0 border-b-4 border-gray-200">
                  <Image src={item.background} alt={item.name} />
                </section>
                <section className="w-28 h-28 object-cover overflow-hidden rounded-full mx-auto border-4 z-20 border-gray-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className={`${
                      item.name === "Hetta Rachma"
                        ? "scale-150 ml-1"
                        : "scale-125"
                    }`}
                  />
                </section>
                <h3 className="text-lg font-semibold text-center mt-16">
                  {item.name}
                </h3>
                <p className="text-center">{item.role}</p>
                <aside className="flex gap-3 items-center justify-center mt-5">
                  <MdOutlineMail
                    className="cursor-pointer hover:scale-110"
                    size={18}
                  />
                  <TbBrandTelegram
                    className="cursor-pointer hover:scale-110"
                    size={18}
                  />
                  <IoLogoInstagram
                    className="cursor-pointer hover:scale-110"
                    size={18}
                  />
                </aside>
              </section>
            ))}
          </section>
        </center>
      </section>
      {/* Our Partner */}
      <section className="mt-24 mx-5">
        <h1 className="text-2xl font-bold text-center text-orange-600">
          Our Partner
        </h1>
        <section className="md:grid flex flex-col grid-cols-2 md:p-5 p-2 gap-5 mt-5">
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
              <a
                href="https://maps.app.goo.gl/yuQLqLMct6pN9jB69"
                target="_blank"
                className="border border-orange-500 p-3 text-orange-500 cursor-pointer rounded-full hover:bg-orange-500 hover:text-white"
              >
                <SiGooglemaps />
              </a>
              <a
                href="mailto:kelurahan.barusarisemsel6a@gmail.com"
                className="border border-orange-500 p-3 text-orange-500 cursor-pointer rounded-full hover:bg-orange-500 hover:text-white"
              >
                <MdOutlineMail size={18} />
              </a>
              <a
                href="tel:+62243540433"
                className="border border-orange-500 p-3 text-orange-500 cursor-pointer rounded-full hover:bg-orange-500 hover:text-white"
              >
                <BsTelephone />
              </a>
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
              <a
                href="https://maps.app.goo.gl/HqsacDxfaNHBVizQ9"
                target="_blank"
                className="border border-orange-500 p-3 text-orange-500 cursor-pointer rounded-full hover:bg-orange-500 hover:text-white"
              >
                <SiGooglemaps />
              </a>
              <a
                href="mailto:kelurahanbulustalan@gmail.com"
                className="border border-orange-500 p-3 text-orange-500 cursor-pointer rounded-full hover:bg-orange-500 hover:text-white"
              >
                <MdOutlineMail size={18} />
              </a>
              <a
                href="tel:+62243540433"
                className="border border-orange-500 p-3 text-orange-500 cursor-pointer rounded-full hover:bg-orange-500 hover:text-white"
              >
                <BsTelephone />
              </a>
            </aside>
          </section>
        </section>
      </section>
      {/* Documentation */}
      <section className="mt-24 mx-5">
        <h1 className="text-2xl font-bold text-center text-orange-600">
          Documentation
        </h1>
        <div className="carousel carousel-center rounded-box mt-8 md:mx-5 mx-0">
          {documentation.map((item: any) => (
            <div className="carousel-item" key={item.id}>
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </section>
      {/* Hero */}
      <section className="mt-24 bg-orange-500">
        <div className="hero lg:min-h-screen md:h-[30em] h-[30em]">
          {/* <div className="hero-overlay bg-opacity-60"></div> */}
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-xl">
              <h1 className="mb-5 md:text-5xl text-3xl font-bold text-white">
                Bantu Kami Tumbuh dan Berkembang
              </h1>
              <p className="mb-5 text-white">
                Masukan, saran, dan support Anda sangat membantu banyak UMKM
                diluaran sana khususnya di kelurahan Barusari dan Bulustalan di
                Kecamatan Semarang Selatan, Kota Semarang, Jawa Tengah.
              </p>
              <section className="flex gap-2 justify-center items-center">
                <aside className="p-3 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-all border bg-white text-orange-500 rounded-full w-fit">
                  <IoChatbubbleEllipsesOutline size={20} />
                </aside>
                <aside className="p-3 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-all border bg-white text-orange-500 rounded-full w-fit">
                  <MdOutlineMail size={20} />
                </aside>
                <aside className="p-3 cursor-pointer hover:bg-gray-100 hover:scale-105 transition-all border bg-white text-orange-500 rounded-full w-fit">
                  <FaInstagram size={20} />
                </aside>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
