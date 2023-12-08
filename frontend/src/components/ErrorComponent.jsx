export default function ErrorComponent({ error }) {
  return (
    <>
      <div className="grid h-screen px-4  place-content-center bg-[#1C1E2D]">
        <div className="text-center">
          <h1 className="font-black  text-5xl text-white">{error?.status}</h1>

          <p className="text-2xl font-bold tracking-tight sm:text-4xl text-white">
            Oops!
          </p>

          <p className="mt-4 text-gray-500 ">
            {error?.status === 400
              ? "Please re-connect to the internet"
              : error?.data?.message || error.error}
          </p>
        </div>
      </div>
    </>
  );
}
