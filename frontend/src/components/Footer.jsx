import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border shadow bg-[#242635] bottom-0 z-1000 border-none">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm  sm:text-center text-gray-400">
          © 2023{" "}
          <Link to="/" className="hover:underline">
            FunHubs™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
