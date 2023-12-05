import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  return (
    <>
      <div className="grid h-screen px-4 place-content-center bg-[#1C1E2D]">
        <div className="text-center bg-[#1C1E2D]">
          <h1 className="font-black text-gray-200 text-9xl">{error?.status}</h1>

          <p className="mt-4 text-white">
            {error?.message} {error?.statusText}
            {error?.error}
          </p>

          <Link
            to="/"
            unstable_viewTransition
            className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
}
