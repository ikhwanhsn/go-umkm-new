import Image from "next/image";
import logo from "../../public/img/logo-png.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-gray-50 mt-32 text-black">
      <aside className="-mt-5">
        <Image src={logo} alt="logo" width={120} height={120} />
        <p className="-mt-5">
          GoUMKM Semarang Ltd.
          <br />
          Help business to grow and be more efficient.
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <Link href="/product/k/barusari" className="link link-hover">
          Products
        </Link>
        <Link href="/store/k/barusari" className="link link-hover">
          Stores
        </Link>
        <Link href="/maps" className="link link-hover">
          Maps
        </Link>
        <Link href="/learn" className="link link-hover">
          Learn
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <Link href="/about" className="link link-hover">
          About us
        </Link>
        <Link href="/about#mentor" className="link link-hover">
          Mentor
        </Link>
        <Link href="/about#team" className="link link-hover">
          Team
        </Link>
        <Link href="/about#partner" className="link link-hover">
          Partner
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <a
          href="https://www.instagram.com/goumkm.pkmpi/"
          target="_blank"
          className="link link-hover"
        >
          Instagram
        </a>
        <a href="mailto:goumkmpkmpi@gmail.com" className="link link-hover">
          Email
        </a>
        <a
          href="tel:+6289668703494"
          target="_blank"
          className="link link-hover"
        >
          Whatsapp
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
