import Image from "next/image";
import mentor from "../../../../public/img/mentor.png";
import team1 from "../../../../public/img/team-p-1.jpg";
import team2 from "../../../../public/img/team-l-1.jpg";
import team3 from "../../../../public/img/team-p-2.jpg";
import team4 from "../../../../public/img/team-l-2.jpg";
import bg1 from "../../../../public/img/bg-team-1.jpg";
import bg2 from "../../../../public/img/bg-team-2.jpg";
import bg3 from "../../../../public/img/bg-team-3.jpg";
import bg4 from "../../../../public/img/bg-team-4.jpg";
import { MdOutlineMail } from "react-icons/md";
import { TbBrandTelegram } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io5";

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
    name: "Pramudya Shaka",
    role: "Anggota",
    background: bg4,
  },
];

const About = () => {
  return (
    <main className="w-full min-h-screen mt-5 px-5 rounded-md">
      <center className="bg-orange-500 text-white px-12 py-28 rounded-md relative">
        <p className="uppercase text-sm">About Us</p>
        <h1 className="text-5xl font-semibold mt-7">
          Misi kami adalah membantu UMKM
          <br />
          <p className="mt-2">tumbuh bersama kami</p>
        </h1>
        <p className="mt-7 mx-44">
          GoUMKM merupakan platform yang membantu UMKM untuk berkembang dan
          lebih efisien dengan teknologi yang kami tawarkan, kami berusaha
          membantu mereka yang mempunyai kesulitan menggunakan platform digital
          untuk berjualan dengan menyediakan aplikasi yang mudah digunakan.
        </p>
      </center>
      <section>
        <h1 className="text-2xl font-bold text-center mt-12 text-orange-600">
          Our Mentor
        </h1>
        <section className="flex gap-12 mt-12 w-1/2 mx-auto">
          <aside>
            <section className="bg-white p-5 rounded-md w-64 shadow-md">
              <Image
                src={mentor}
                alt="mentor"
                width={210}
                height={210}
                className="scale-x-[-1] -mt-5"
              />
              <section className="text-center mt-5">
                <h2 className="font-semibold">Puri Muliandhi, S.T., M.T.</h2>
                <p className="text-sm mt-1">Dosen Teknik Elektro</p>
                <p className="text-sm">Universitas Semarang</p>
              </section>
            </section>
          </aside>
          <aside>
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
          </aside>
        </section>
      </section>
      <section className="mt-24">
        <h1 className="text-2xl font-bold text-center text-orange-600">
          Our Team
        </h1>
        <section className="flex justify-between items-center mt-12 mx-12">
          {team.map((item) => (
            <section key={item.name} className="relative">
              <section className="w-64 object-cover overflow-hidden h-44 z-0 border-b-4 border-gray-200">
                <Image src={item.background} alt={item.name} />
              </section>
              <section className="w-28 h-28 object-cover overflow-hidden rounded-full mx-auto border-4 z-20 border-gray-200 absolute top-28 left-16 ml-3">
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
      </section>
    </main>
  );
};

export default About;
