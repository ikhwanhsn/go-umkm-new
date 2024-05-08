"use client";

import Image from "next/image";
import logo from "../../public/img/logo-png.png";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const menu = [
    {
      page: "/product",
      name: "All Product",
    },
    {
      page: "/store",
      name: "Store",
    },
    {
      page: "/about",
      name: "About",
    },
  ];
  const router = useRouter();
  const { status, data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="navbar bg-gray-50 shadow-md text-black h-16 md:px-12 px-3 fixed top-0 w-full z-50">
      {/* ===== Navbar Start ===== */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-50 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link href="/" className="-ml-3 md:ml-0">
          <Image src={logo} alt="Logo" width={80} height={80} />
        </Link>
      </div>
      {/* ===== Navbar Center ===== */}
      <div className="navbar-center hidden lg:flex gap-5">
        {menu.map((item, index) => (
          <Link
            href={item.page}
            key={index}
            className={`text-black w-fit ${
              pathname === item.page ? "border-b-2 border-black" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      {/* ===== Navbar End ===== */}
      <div className="navbar-end md:space-x-4 space-x-2">
        <button
          className="btn btn-ghost -mr-3 btn-circle"
          onClick={() => router.push("/likes")}
        >
          <FaRegHeart size={20} className="text-center" />
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="">
              <IoPersonOutline size={20} className="text-center" />
              {/* <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              /> */}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-50 rounded-box w-52 bg-white"
          >
            {session && (
              <li>
                <p>
                  {session.user?.name}
                  <span className="badge">User</span>
                </p>
              </li>
            )}
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Toko saya</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            {/* <li>
              <a>Logout</a>
            </li> */}
          </ul>
        </div>
        <button
          className="btn btn-primary text-white"
          onClick={() =>
            status === "authenticated" ? signOut() : signIn("google")
          }
        >
          {status === "authenticated" ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
