const Maps = () => {
  return (
    <main className="w-full min-h-screen p-5">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31680.945032327767!2d110.41102755729756!3d-6.995366438801659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b601b17c5bd%3A0xe78771cbc4206238!2sKec.%20Semarang%20Sel.%2C%20Kota%20Semarang%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1717822583919!5m2!1sid!2sid"
        width="100%"
        height="600"
        style={{ border: "0" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg"
      ></iframe>
    </main>
  );
};

export default Maps;
