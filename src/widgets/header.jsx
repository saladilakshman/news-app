import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import { SiApplenews } from "react-icons/si";
import { useContext } from "react";
import { NewsContext } from "../App";
import { categories } from "../utils/data";
import axios from "axios";
const Header = () => {
  const {
    state: { darkmode, activecategory, inputvalue },
    dispatch,
  } = useContext(NewsContext);
  const navbarclose = () => {
    const nav = document.querySelector(".nav-toggler");
    nav.classList.toggle("opacity-100");
  };
  const getNewsCategory = (index) => {
    dispatch({
      type: "get-news-by-category",
      payload: index,
    });
    navbarclose();
  };
  const searchNews = () => {
    if (inputvalue === "") {
      return null;
    }
    if (Number(inputvalue)) {
      alert("You have entered a number, please check.");
    } else {
      dispatch({ type: "data-fetching" });
      axios
        .get(
          `https://gnews.io/api/v4/search?q=${inputvalue}&lang=en&apikey=${
            import.meta.env.VITE_APP_API_KEY
          }`
        )
        .then((res) => {
          dispatch({ type: "search-news", payload: res.data?.articles });
        })
        .catch(() => dispatch({ type: "search-news-fail" }))
        .finally(() => {
          navbarclose();
        });
    }
  };

  return (
    <>
      <header className="header sticky top-0 z-10 border-b-2 dark:border-b-zinc-900 bg-white dark:bg-gray-800">
        <nav className="flex justify-between items-center px-4 py-2 lg:py-0">
          <div className="flex gap-2 items-center lg:text-2xl text-lg text-rose-600 font-semibold">
            <SiApplenews />
            <h1>News10</h1>
          </div>
          <div className="nav-toggler md:static absolute left-0 top-8 lg:opacity-100 opacity-0 p-2 right-0 max-md:duration-500 max-md:bg-white dark:max-md:bg-gray-800 dark:max-md:text-white">
            <ul className="block lg:inline-flex gap-5 max-md:gap-8 capitalize text-lg">
              {categories.map((ct, index) => {
                return (
                  <li
                    key={index}
                    className={`hover:text-blue-400 ${
                      activecategory === index
                        ? "text-blue-400"
                        : "text-inherit"
                    } transition-colors cursor-default max-md:w-1/3 max-sm:py-1`}
                    onClick={() => getNewsCategory(index)}
                  >
                    {ct}
                  </li>
                );
              })}
            </ul>
            <div className="block lg:hidden mt-4">
              <div className="relative">
                <input
                  type="text"
                  value={inputvalue}
                  onChange={(e) =>
                    dispatch({
                      type: "input-insertion",
                      payload: e.target.value,
                    })
                  }
                  className="border-solid bg-white focus:outline-none text-black pl-3 dark:border-none h-10 rounded border border-sky-300 w-full"
                />
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded text-base absolute right-2 top-1"
                  onClick={searchNews}
                >
                  search
                </button>
              </div>
            </div>
          </div>
          <div
            onClick={() => dispatch({ type: "theme-switch" })}
            className="text-2xl   max-md:pl-36 text-zinc-600 dark:text-white"
          >
            {darkmode ? <MdLightMode /> : <MdDarkMode />}
          </div>
          <div className="hidden lg:flex justify-center items-center relative w-[20%]">
            <input
              value={inputvalue}
              onChange={(e) =>
                dispatch({ type: "input-insertion", payload: e.target.value })
              }
              type="text"
              className="border-solid bg-white focus:outline-none text-black pl-3 dark:border-none h-10 rounded border border-sky-300 w-full "
            />
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-base absolute right-2 top-1"
              onClick={searchNews}
            >
              search
            </button>
          </div>
          <FaBars
            className="text-2xl block md:hidden text-zinc-600 dark:text-white"
            onClick={navbarclose}
          />
        </nav>
      </header>
    </>
  );
};

export default Header;
