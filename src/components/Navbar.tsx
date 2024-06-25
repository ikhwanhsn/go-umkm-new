"use client";

import Image from "next/image";
import logo from "../../public/img/logo-png.png";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { MdOpenInNew } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className="navbar bg-gray-50 shadow-md text-black h-16 md:px-5 lg:px-8 px-3 fixed top-0 w-full z-50">
      {/* ===== Navbar Start ===== */}
      <div className="navbar-start">
        {pathname !== "/" && (
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
                <details>
                  <summary>Produk</summary>
                  <ul className="p-2 bg-gray-50">
                    <li>
                      <Link href="/product/k/barusari">Barusari</Link>
                    </li>
                    <li>
                      <Link href="/product/k/bulustalan">Bulustalan</Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Toko</summary>
                  <ul className="p-2 bg-gray-50">
                    <li>
                      <Link href="/store/k/barusari">Barusari</Link>
                    </li>
                    <li>
                      <Link href="/store/k/bulustalan">Bulustalan</Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Lainnya</summary>
                  <ul className="p-2 bg-gray-50">
                    <li>
                      <Link href="/maps">Maps</Link>
                    </li>
                    {/* <li>
                      <Link href="/forum">Forum</Link>
                    </li> */}
                    <li>
                      <Link href="/learn">Learn</Link>
                    </li>
                    <li>
                      <Link href="/about">About</Link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        )}
        <Link href="/" className="-ml-3 md:ml-0">
          <Image src={logo} alt="Logo" width={110} height={110} />
        </Link>
      </div>
      {/* ===== Navbar Center ===== */}
      {pathname !== "/" && (
        <div className="navbar-center hidden lg:flex">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost bg-gray-50 font-normal"
            >
              Produk
              <IoIosArrowDown />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-gray-50 rounded-box w-40 mt-2"
            >
              <li>
                <Link href="/product/k/barusari">Barusari</Link>
              </li>
              <li>
                <Link href="/product/k/bulustalan">Bulustalan</Link>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost bg-gray-50 font-normal"
            >
              Toko
              <IoIosArrowDown />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-gray-50 rounded-box w-40 mt-2"
            >
              <li>
                <Link href="/store/k/barusari">Barusari</Link>
              </li>
              <li>
                <Link href="/store/k/bulustalan">Bulustalan</Link>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost bg-gray-50 font-normal"
            >
              Lainnya
              <IoIosArrowDown />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-gray-50 rounded-box w-32 mt-2"
            >
              <li>
                <Link href="/maps">Maps</Link>
              </li>
              <li>
                <Link href="/learn">Learn</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
          {/* <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Product</summary>
                <ul className="p-2 bg-gray-50">
                  <li>
                    <Link href="/product/k/barusari">Barusari</Link>
                  </li>
                  <li>
                    <Link href="/product/k/bulustalan">Bulustalan</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Store</summary>
                <ul className="p-2 bg-gray-50">
                  <li>
                    <Link href="/store/k/barusari">Barusari</Link>
                  </li>
                  <li>
                    <Link href="/store/k/bulustalan">Bulustalan</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Others</summary>
                <ul className="p-2 bg-gray-50">
                  <li>
                    <Link href="/maps">Maps</Link>
                  </li>
                  <li>
                    <Link href="/forum">Forum</Link>
                  </li>
                  <li>
                    <Link href="/learn">Learn</Link>
                  </li>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul> */}
        </div>
      )}
      {/* ===== Navbar End ===== */}
      <div className="navbar-end md:space-x-4 space-x-2">
        {status === "authenticated" && (
          <button
            className="btn btn-ghost -mr-3 btn-circle"
            onClick={() => router.push("/likes")}
          >
            <FaRegHeart size={20} className="text-center" />
          </button>
        )}
        {status === "authenticated" && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="">
                <IoPersonOutline size={20} className="text-center" />
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
              {session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_1 && (
                <li>
                  <Link href="/admin/barusari">Dashboard</Link>
                </li>
              )}
              {session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_2 && (
                <li>
                  <Link href="/admin/bulustalan">Dashboard</Link>
                </li>
              )}
              <li>
                <a href="https://wa.me/6288221495861" target="_blank">
                  Hubungi admin
                  <MdOpenInNew size={15} className="text-black -ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/drive/folders/1GyORWnrU09kDA8s_-EpN09L4_qIM_ucY"
                  target="_blank"
                >
                  Tutorial
                  <MdOpenInNew size={15} className="text-black -ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/file/d/15KEGTmJDuRakCgw5p5j6eoZpps7Nr_4c/view?usp=sharing"
                  target="_blank"
                >
                  Documentation
                  <MdOpenInNew size={15} className="text-black -ml-1" />
                </a>
              </li>
              {/* <li>
              <Link href="/settings">Settings</Link>
            </li> */}
            </ul>
          </div>
        )}
        <button
          className="btn bg-orange-500 border-none hover:bg-orange-600 text-white"
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
