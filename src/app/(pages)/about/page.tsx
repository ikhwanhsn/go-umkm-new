import Image from "next/image";
import mentor from "../../../../public/img/mentor.jpg";
import team1 from "../../../../public/img/team-p-1.jpg";
import team2 from "../../../../public/img/team-l-1.jpg";
import team3 from "../../../../public/img/team-p-2.jpg";
import team4 from "../../../../public/img/team-l-2.jpg";

const About = () => {
  return (
    <main className="w-full min-h-screen mt-5 px-5 rounded-md">
      <center className="bg-orange-500 text-white px-12 py-28 rounded-md relative">
        <p className="uppercase text-sm">About Us</p>
        <h1 className="text-5xl font-semibold mt-7">
          Our Vision is to help UMKM
          <br />
          <p className="mt-2">grow with us</p>
        </h1>
        <p className="mt-7 mx-44">
          GoUMKM is a platform that helps UMKM to grow and be more efficient
          with the technology that we offer, we try to help those who have
          difficulty using digital platforms to sell by providing applications
          that are easy to use.
        </p>
      </center>
      <section>
        <h1 className="text-xl font-semibold text-center mt-12">Our Mentor</h1>
        <section className="grid grid-cols-2 mt-12 mx-64">
          <Image src={mentor} alt="mentor" width={200} height={200} />
          <aside>
            <h2 className="text-xl font-semibold">Mentor Name</h2>
            <p className="text-lg">Mentor Job</p>
            <p className="text-lg">Mentor Email</p>
          </aside>
        </section>
      </section>
      <section>
        <h1 className="text-xl font-semibold text-center mt-12">Our Team</h1>
        <section className="flex justify-between items-center mt-12 mx-12">
          <Image
            src={team1}
            alt="mentor"
            width={200}
            height={200}
            className="object-cover"
          />
          <Image
            src={team2}
            alt="mentor"
            width={200}
            height={200}
            className="object-cover"
          />
          <Image
            src={team3}
            alt="mentor"
            width={200}
            height={200}
            className="object-cover"
          />
          <Image
            src={team4}
            alt="mentor"
            width={200}
            height={200}
            className="object-cover"
          />
        </section>
      </section>
    </main>
  );
};

export default About;
