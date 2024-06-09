import { CgProfile } from "react-icons/cg";
import { FaArrowUp } from "react-icons/fa";
import { SiLivechat } from "react-icons/si";

const dataMessage = [
  {
    id: 1,
    name: "Joko Susilo",
    message: "Ini adalah pesan dari Joko",
    time: "3hr ago",
  },
  {
    id: 2,
    name: "Siti Aminah",
    message: "Halo, saya Siti. Bagaimana kabarnya?",
    time: "2hr ago",
  },
  {
    id: 3,
    name: "Budi Santoso",
    message: "Apakah ada yang bisa membantu saya dengan masalah ini?",
    time: "2hr ago",
  },
  {
    id: 4,
    name: "Ayu Lestari",
    message: "Selamat pagi semuanya!",
    time: "1hr ago",
  },
  {
    id: 5,
    name: "Rina Andriani",
    message: "Ada yang tahu cara memperbaiki masalah ini?",
    time: "42m ago",
  },
  {
    id: 6,
    name: "Dedi Supriyadi",
    message: "Saya baru saja bergabung, senang bertemu dengan kalian semua.",
    time: "33m ago",
  },
  {
    id: 7,
    name: "Toni Wijaya",
    message: "Apa yang sedang dibahas saat ini?",
    time: "25m ago",
  },
  {
    id: 8,
    name: "Linda Marlina",
    message: "Saya punya informasi terbaru tentang proyek kita.",
    time: "5m ago",
  },
];

const Forum = () => {
  return (
    <main className="w-full h-full">
      <section className="grid grid-cols-5 relative">
        <aside className="w-1/5 bg-gray-100 min-h-screen fixed top-16 left-0 z-20 hidden md:block">
          <section className="flex gap-2 items-center px-8 py-6 cursor-pointer hover:bg-gray-200">
            <SiLivechat />
            <h1>Global Chat Forum</h1>
          </section>
        </aside>
        <aside className="md:w-4/5 w-full min-h-screen z-20 bg-white fixed top-16 right-0">
          <section className="flex items-center gap-3 p-3 border-b-2">
            <CgProfile size={32} className="profile-icon" />
            <section>
              <h1>Global Chat Forum</h1>
              <p className="text-sm">78 Online</p>
            </section>
          </section>
          <section className="overflow-y-scroll h-[calc(100vh-4rem)] p-3">
            {dataMessage.map((message) => (
              <section key={message.id} className="flex items-center gap-3 p-3">
                <CgProfile size={32} className="profile-icon" />
                <section>
                  <h1>
                    {message.name}{" "}
                    <span className="text-sm ml-1 text-gray-500">
                      {message.time}
                    </span>
                  </h1>
                  <p>{message.message}</p>
                </section>
              </section>
            ))}
            <section className="bg-white h-32 w-full"></section>
            <section className="relative w-full">
              <label className="input input-bordered bg-white flex items-center gap-2 fixed bottom-3 z-30 w-full md:w-[61em]">
                <input
                  type="text"
                  className="grow"
                  placeholder="Type your message..."
                />
                <section className="cursor-pointer bg-black text-white p-2 rounded-md">
                  <FaArrowUp />
                </section>
              </label>
            </section>
          </section>
        </aside>
      </section>
    </main>
  );
};

export default Forum;
