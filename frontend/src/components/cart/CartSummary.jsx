import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../slices/cartSlice";
export default function CartSummary({ c: product, ind, setCurrent }) {
  const [qt, setQt] = useState(product.qty || 1);
  const dispatch = useDispatch();
  useEffect(() => {
    setCurrent(ind);
  }, [ind, setCurrent]);

  function handleInc() {
    if (qt >= product.countInStock) return;
    const qty = qt + 1;
    product = { ...product, qty };
    dispatch(addToCart({ product, qty }));
    setQt((qt) => qt + 1);
  }

  function handleDec() {
    if (qt <= 1) return;
    const qty = qt - 1;
    product = { ...product, qty };
    dispatch(addToCart({ product, qty }));
    setQt((qt) => qt - 1);
  }

  const addToCartHandler = async (inp) => {
    if (qt < 1 || qt > product.countInStock) return;
    let num = +inp > qt ? 1 : -1;
    const value = Math.max(1, Math.min(product.countInStock, Number(inp)));
    const qty = qt + num;
    product = { ...product, qty };
    dispatch(addToCart({ product, qty }));
    setQt(() => value);
  };

  const removeFromCartHandler = async (id) => {
    product = { ...product, qt };
    dispatch(removeFromCart({ product, qty: qt, id }));
  };
  return (
    <div>
      <div className="justify-between mb-6 rounded-lg  p-6 shadow-md sm:flex sm:justify-start bg-[#151725]">
        <img
          src={product.image}
          alt="product-image"
          className="w-full rounded-lg sm:w-40"
        />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold  text-white">{product.name}</h2>
            <p className="mt-1 text-xs text-white">
              {product.category} - {product.brand}
            </p>
          </div>
          <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <button
                onClick={handleDec}
                className="cursor-pointer rounded-l  py-1 px-2.5 duration-100 hover:bg-blue-500 hover:text-blue-50 bg-[#151729] text-white"
              >
                -
              </button>
              <input
                className="h-8 w-8    text-center text-xs outline-none bg-[#151729] text-white border-none"
                type="number"
                placeholder={qt}
                value={qt}
                min={1}
                max={product.countInStock}
                onChange={(e) => addToCartHandler(e.target.value)}
              />
              <button
                onClick={handleInc}
                className="cursor-pointer rounded-l  py-1 px-2.5 duration-100 hover:bg-blue-500 hover:text-blue-50 bg-[#151729] text-white"
              >
                +
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <p className="text-base text-white">${product.price}</p>

              <img
                src="/assets/removeCart.png"
                className="w-[21px] h-[21px] object-contain cursor-pointer mr-1 bg-[#151729] "
                alt="remove-cart"
                onClick={() => removeFromCartHandler(product._id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
