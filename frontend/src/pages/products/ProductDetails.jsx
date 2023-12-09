import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { RatingStars } from "../../components/RatingStars";
import CustomSpinner from "../../components/CustomSpinner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { toast } from "react-toastify";
export default function VanDetail() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
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
  const handleRatingChange = (e) => {
    const value = Math.max(0, Math.min(5, Number(e.target.value)));
    setRating(value);
  };
  const submitReview = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:3000/product/${id}/reviews`,
        {
          rating,
          comment: e.target.feedback.value,
          userInfo,
        }
      );
      console.log(res);
      toast.success("Added successfully");
      window.location.reload();
    } catch (error) {
      // Handle error (you may want to show an error message)

      toast.error(error?.response?.data?.message);
    }
  };

  console.log(product);
  const hideReviewsText = false;

  const min = 1;
  const max = product.countInStock;

  function handleChange(e) {
    const value = Math.max(min, Math.min(max, Number(e.target.value)));
    setQty(value);
  }
  function addToCardHandler() {
    dispatch(addToCart({ product, qty }));
    toast.success("Added successfully");
  }
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
                      to="."
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
                    onClick={addToCardHandler}
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
      {userInfo?.token ? (
        <>
          <Reviews product={product} />
          <form
            onSubmit={submitReview}
            className="w-full p-10 flex flex-col ml-5"
            id="feedbackForm"
          >
            <div className="relative  mb-3">
              <label
                className="block uppercase text-gray-200 text-xs font-bold mb-2"
                htmlFor="rating"
              >
                Rating
              </label>
              <input
                type="number"
                name="rating"
                id="rating"
                min="0"
                max="5"
                step="0.1"
                value={rating}
                onChange={handleRatingChange}
                required
                className="border-0 px-3 py-3 rounded text-sm shadow 
                    bg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
                placeholder="Write a number between 0 - 5"
              />
            </div>
            <div className="relative  mb-3">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                name="feedback"
                id="feedback"
                rows="4"
                cols="80"
                className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none "
                placeholder=""
                required
              ></textarea>
            </div>
            <div className="mt-6">
              <button
                id="feedbackBtn"
                className="bg-[#FBC02D] text-black text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="submit"
              >
                Write a review
              </button>
            </div>
          </form>
        </>
      ) : (
        <Reviews product={product} />
      )}
    </div>
  );
}
function Reviews({ product }) {
  console.log(product.reviews);
  const reviews = product?.reviews;
  return (
    <ul className="p-5 ">
      {reviews.map((r) => (
        <>
          <li className="py-8 text-left  px-4 m-2 ">
            <div className="flex items-start">
              <img
                className="block h-10 w-10 max-w-full justify-self-center  self-center	flex-shrink-0 rounded-full align-middle"
                src="/assets/avatar.png"
                alt="avatar"
              />
              <div className="ml-3">
                <p className="mt-5 text-sm font-bold text-white">{r.name}</p>
                <div className="flex items-center pt-3">
                  <RatingStars
                    rating={r.rating}
                    reviews={product.numReviews}
                    showText={false}
                  />
                </div>
                <p className="mt-5 text-base text-white">{r.comment}</p>
              </div>
            </div>
          </li>
        </>
      ))}
    </ul>
  );
}
