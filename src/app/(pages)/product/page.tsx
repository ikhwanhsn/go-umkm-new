import AllProduct from "@/components/AllProduct";
import { FiFilter } from "react-icons/fi";

const Product = () => {
  return (
    <main className="w-full min-h-screen px-12 mt-5">
      <section className="flex justify-between items-center">
        <section>
          <h1 className="text-xl font-bold mb-1">All Product</h1>
          <p>Welcome to all product page</p>
        </section>
        <section className="flex gap-2 items-center">
          <label className="input input-bordered flex items-center gap-2 bg-gray-50">
            <input type="text" className="" placeholder="Search here..." />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1 btn-outline">
              <FiFilter />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </section>
      </section>
      <AllProduct />
    </main>
  );
};

export default Product;
