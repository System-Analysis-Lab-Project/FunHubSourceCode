import { useState, useEffect } from "react";
import axios from "axios";
import CustomSpinner from "../../components/CustomSpinner";
import ErrorComponent from "../../components/ErrorComponent";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
export default function ProductList() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((store) => store.auth.userInfo);
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/product");
      setProduct(res?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err?.response.data.error || err?.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return <CustomSpinner />;
  }

  const token = user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    authorization: `Bearer ${token}`,
  };
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        const res = await axios.post("http://localhost:3000/product", null, {
          headers: headers,
        });
        console.log(res);
        window.location.reload();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const url = `http://localhost:3000/product/${id}`;
        const res = await axios.delete(url, { headers });
        console.log(res);
        window.location.reload();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="max-w-2xl mx-auto min-w-fit min-h-screen my-3">
      {loading ? (
        <CustomSpinner />
      ) : error ? (
        <ErrorComponent />
      ) : (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex justify-start items-end flex-col">
            <div className="flex ">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center m-2 text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5 mx-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" />
                </svg>

                <span className="mx-1">Refresh</span>
              </button>
              <button
                type="button"
                onClick={createProductHandler}
                className=" m-2 text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                Add Product
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </button>
            </div>

            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Brand
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.map((p) => (
                  <tr
                    key={p._id}
                    className=" border-b bg-gray-800 border-gray-700 hover:bg-gray-50 hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{p._id}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-white whitespace-nowrap"
                    >
                      {p.name}
                    </th>
                    <td className="px-6 py-4">{p.brand}</td>
                    <td className="px-6 py-4">{p.category}</td>
                    <td className="px-6 py-4">${p.price}</td>
                    <td className="px-6 py-4 text-right">
                      <a className="font-medium text-blue-500 hover:underline">
                        Edit
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteProductHandler(p._id)}
                        className="pointer font-medium text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
