import AllStore from "@/components/AllStore";
import { FiFilter } from "react-icons/fi";

const Store = () => {
  return (
    <main className="w-full min-h-screen px-12 mt-5">
      <section className="flex justify-between items-center">
        <section>
          <h1 className="text-xl font-bold mb-1">Store</h1>
          <p>Welcome to store page</p>
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
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 btn-outline border-gray-200 hover:bg-gray-100"
            >
              <FiFilter className="text-black" />
            </div>
            <div
              tabIndex={0}
              className="dropdown-content z-[1] menu px-3 py-2 shadow bg-gray-50 rounded-box w-44"
            >
              <div className="form-control">
                <label className="label cursor-pointer flex justify-between w-full">
                  <span className="label-text text-black">Barusari</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text text-black">Bulustalan</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>
      </section>
      <AllStore />
    </main>
  );
};

export default Store;