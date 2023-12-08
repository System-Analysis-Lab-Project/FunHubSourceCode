import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { resetCart, clearCartItems } from "../slices/cartSlice";
import axios from "axios";
import SearchResults from "./SearchResults";
export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery === "") return;
    try {
      const response = await axios.post(
        "http://localhost:3000/product/search",
        {
          name: searchQuery,
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error(
        "Error during search:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <header className="antialiased">
        <nav className="bg-[#151725] border-gray-800 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <Link to="/" className="flex mr-4">
                <img
                  src="https://flowbite.s3.amazonaws.com/logo.svg"
                  className="mr-3 h-8"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                  FunHubs
                </span>
              </Link>
              <form onSubmit={handleSearch} className="hidden lg:block lg:pl-2">
                <label htmlFor="topbar-search" className="sr-only">
                  Search
                </label>
                <div className="relative mt-1 lg:w-96">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      {" "}
                      <path
                        stroke="currentColor"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />{" "}
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="topbar-search"
                    className="bg-[#1C1E2D] text-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="flex items-center lg:order-3">
              <CartButton />
              <UserHamburger />
            </div>
          </div>
        </nav>
        <nav className="bg-[#151725] border-gray-800 px-4 lg:px-6 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex gap-x-8">
              <Link
                to="/products"
                className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-[#242635]"
              >
                <span className="relative text-sm font-medium w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left text-white after:bg-white">
                  Shop
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <div className="w-50">
        {searchResults && (
          <SearchResults
            results={searchResults}
            setSearchResults={setSearchResults}
            setSearchQuery={setSearchQuery}
          />
        )}
      </div>
    </>
  );
}
function CartButton() {
  const cart = useSelector((state) => state.cart.cardItems);

  return (
    <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100 hover:bg-[#242635]">
      <Link to="/cart" className="flex items-center gap-x-1">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white ">
            {cart?.length || 0}
          </span>
        </div>
      </Link>
    </div>
  );
}
function UserHamburger() {
  const [showProfile, setShowProfile] = useState(false);
  const btnRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      dispatch(logout());
      dispatch(resetCart());
      dispatch(clearCartItems());
      navigate("/");
      setShowProfile(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const closeDropDown = (e) => {
      if (!btnRef?.current?.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("click", closeDropDown);

    return () => document.removeEventListener("click", closeDropDown);
  }, [setShowProfile]);
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo?.token) {
    return (
      <>
        <div className="flex cursor-pointer items-center justify-center gap-x-1 rounded-md py-2 px-4">
          <div className="relative z-40">
            <button
              ref={btnRef}
              onClick={() => setShowProfile((prev) => !prev)}
              className="flex items-center justify-center  rounded-full overflow-hidden focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span className="text-sm font-medium text-white ml-1">
                {userInfo?.firstname} {userInfo?.lastname}
              </span>
            </button>

            {showProfile && (
              <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
                <Link
                  to="/profile"
                  className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
                >
                  Profile
                </Link>
                <div className="py-2">
                  <hr></hr>
                </div>
                <button
                  onClick={handleLogout}
                  className="transition-colors text-left w-full duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Link to="/register">
        <div className="ml-2 flex cursor-pointer items-center gap-x-1 border-r py-2 px-4 hover:">
          {/* className="text-sm font-medium " */}
          <span className="relative text-sm font-medium w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left text-white after:bg-white">
            Create an account
          </span>
        </div>
      </Link>
      <Link to="/login">
        <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100 hover:bg-[#242635]">
          <span className="text-sm font-medium text-white ">Sign in</span>
        </div>
      </Link>
    </>
  );
}
