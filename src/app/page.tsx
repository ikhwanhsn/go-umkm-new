import Header from "@/components/Header";
import Lokasi from "@/components/Lokasi";
import LokasiImage from "@/components/LokasiImage";
import Mitra from "@/components/Mitra";
import Outro1 from "@/components/Outro1";
import Outro2 from "@/components/Outro2";
import ProdukUnggulan from "@/components/ProdukUnggulan";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Header />
      <Mitra />
      <Lokasi />
      <LokasiImage />
      <ProdukUnggulan />
      <Outro1 />
      <Outro2 />
    </main>
  );
}
