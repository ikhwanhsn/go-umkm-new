import Marquee from "react-fast-marquee";
import mitra1 from "../../public/img/mitra-1.png";
import mitra2 from "../../public/img/mitra-2.png";
import mitra3 from "../../public/img/mitra-3.png";
import mitra4 from "../../public/img/mitra-4.png";
import mitra5 from "../../public/img/mitra-5.png";
import mitra6 from "../../public/img/mitra-6.png";
import mitra7 from "../../public/img/mitra-7.png";
import Image from "next/image";

const Mitra = () => {
  return (
    <main className="mt-12">
      <h1 className="text-center text-2xl text-orange-500 font-bold lg:mb-7 md:mb-6 mb-5">
        Mitra UMKM
      </h1>
      <MarqueeComponent />
    </main>
  );
};

export default Mitra;

const MarqueeComponent = () => {
  const mitra = [
    mitra1,
    mitra2,
    mitra3,
    mitra4,
    mitra5,
    mitra6,
    mitra7,
    mitra1,
    mitra2,
    mitra3,
    mitra4,
    mitra5,
    mitra6,
    mitra7,
  ];
  return (
    <Marquee speed={40}>
      {mitra.map((item, index) => (
        <Image
          key={index}
          src={item}
          alt="mitra"
          width={70}
          height={70}
          className="md:mx-7 mx-4"
        />
      ))}
    </Marquee>
  );
};
