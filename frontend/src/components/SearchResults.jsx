import { Link } from "react-router-dom";

const SearchResults = ({ results, setSearchResults, setSearchQuery }) => {
  const handleLinkClick = () => {
    setSearchResults(null);
    setSearchQuery("");
  };
  return (
    <div className="bg-[#151725] w-50 p-5">
      <h2 className="text-1xl font-bold  text-white">Search Results</h2>
      <ul className="flex">
        {results.map((result) => (
          <li key={result._id} className="mb-2 " onClick={handleLinkClick}>
            <Link to={`/products/${result._id}`}>
              <div className="bg-[#1C1E2D] p-2 ml-2 rounded-md shadow-md transition duration-300 hover:bg-[#242635]">
                <p className="text-1xl text-white font-semibold">
                  {result.name}
                </p>
                {/* Add more information about the product as needed */}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
