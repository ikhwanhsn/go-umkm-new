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
      </section>
    </main>
  );
};

export default About;
