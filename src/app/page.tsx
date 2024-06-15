import Header from "@/components/Header";
import JumlahPengunjung from "@/components/JumlahPengunjung";
import Lokasi from "@/components/Lokasi";
import LokasiImage from "@/components/LokasiImage";
import Mitra from "@/components/Mitra";
import Outro1 from "@/components/Outro1";
import Outro2 from "@/components/Outro2";
import ProdukUnggulan from "@/components/ProdukUnggulan";
import VisiMisi from "@/components/VisiMisi";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Header />
      <VisiMisi />
      <Mitra />
      <Lokasi />
      <LokasiImage />
      <JumlahPengunjung />
      <ProdukUnggulan />
      <Outro1 />
      <Outro2 />
    </main>
  );
}
