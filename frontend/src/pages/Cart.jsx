import { useSelector } from "react-redux";

import { useState } from "react";

import CartSummary from "../components/cart/CartSummary";
import CartCheckout from "../components/cart/CartCheckout";

export default function Cart() {
  const cart = useSelector((store) => store.cart.cardItems);
  const subs = useSelector((store) => store.cart);
  const [current, setCurrent] = useState(0);
  const [qt] = useState(cart[current]?.qty || 1);

  if (subs.cardItems.length <= 0) {
    return (
      <div className="grid h-screen px-4 bg-[#1C1E2D] place-content-center ">
        <div className="text-center">
          <p className="text-2xl font-bold tracking-tight  sm:text-4xl text-white">
            Your Cart is Empty
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen  pt-20 overflow-y-auto bg-[#1C1E2D] scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 scrollbar-thumb-blue-500 scrollbar-track-gray-700">
      <h1 className="mb-10 text-center text-2xl font-bold text-white">
        Cart Items
      </h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart.map((c, i) => {
            return (
              <CartSummary
                qt={qt}
                key={c._id}
                c={c}
                ind={i}
                setCurrent={setCurrent}
              />
            );
          })}
        </div>
        <CartCheckout subs={subs} />
      </div>
    </div>
  );
}
