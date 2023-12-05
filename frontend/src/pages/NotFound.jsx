import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="grid h-screen px-4  place-content-center bg-[#1C1E2D]">
        <div className="text-center">
          <h1 className="font-black text-gray-200 text-9xl">404</h1>

          <p className="mt-4 text-white">That page not exist.</p>

          <Link
            to="/"
            className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
}
