import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { RatingStars } from "../../components/RatingStars";
import CustomSpinner from "../../components/CustomSpinner";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../slices/cartSlice";
import { toast } from "react-toastify";
export default function VanDetail() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`http://localhost:3000/product/${id}`);
        setProduct(res?.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(err?.response.data.error || err?.message);
      }
    }
    fetchProducts();
  }, [id]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return <CustomSpinner />;
  }

  const hideReviewsText = false;

  const min = 1;
  const max = product.countInStock;

  function handleChange(e) {
    const value = Math.max(min, Math.min(max, Number(e.target.value)));
    setQty(value);
  }
  console.log(product);
  return (
    <div>
      <Link
        to="/products"
        relative="path"
        className="text-white mx-auto flex max-w-2xl items-center space-x-2 px-4 pt-5 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        &larr; <span className="ml-2 text-white">Back to all products</span>
      </Link>
      <div className="bg-[#1C1E2D]">
        <div className="pt-6">
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl  lg:gap-x-8 lg:px-8">
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-50 w-50 object-cover object-center"
                />
              </div>
            </div>

            {/* <!-- Product info --> */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-white">
                  {product.name}
                </h1>
              </div>

              {/* <!-- Options --> */}
              <div className="mt-4 lg:row-span-3 lg:mt-0 ">
                <h2 className="sr-only text-white">{product.description}</h2>

                <div className="mb-2 flex flex-col justify-between">
                  <p className="text-3xl tracking-tight text-gray-900 mb-4 text-white">
                    ${product.price}
                  </p>
                  {product.countInStock > 0 ? (
                    <p className="text-1xl tracking-tight text-[#007600] mb-4 ">
                      In Stock
                    </p>
                  ) : (
                    <p className="text-1xl tracking-tight text-[#CC0C39] mb-4">
                      Out of Stock
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white">Qty</p>
                  <form>
                    <input
                      className="appearance-none   w-20 bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="number"
                      placeholder={qty}
                      value={qty}
                      onChange={handleChange}
                      min={1}
                      max={product.countInStock}
                    />
                  </form>
                </div>
                <hr className="my-4" />

                {/* <!-- Reviews --> */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <RatingStars
                        rating={product.rating}
                        reviews={product.numReviews}
                        showText={hideReviewsText}
                      />
                    </div>
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                    <Link
                      href="."
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {product.numReviews} reviews
                    </Link>
                  </div>
                </div>

                {product.countInStock > 0 && (
                  <button
                    type="button"
                    className="mt-20 flex w-full items-center justify-center rounded-md border border-transparent bg-[#FBC02D] px-8 py-3 text-base font-medium text-white hover:bg-[#FBC03D] focus:outline-none focus:ring-2 focus:bg-[#FBC03D] focus:ring-offset-2"
                    disabled={product.countInStock === 0}
                    // onClick={addToCardHandler}
                  >
                    Add to bag
                  </button>
                )}
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* <!-- Description and details --> */}
                <div>
                  <h3 className="sr-only text-white">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-white">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-white">Highlights</h3>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-white">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-white">{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
