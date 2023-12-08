import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustomSpinner from "../../components/CustomSpinner";
export default function CartCheckout({ subs }) {
  const { userInfo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const values = {
    orderItems: subs.cardItems,
    itemsPrice: subs.itemsPrice,
    totalPrice: subs.totalPrice,
    user: userInfo,
  };
  async function handleOrder() {
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/order/addOrder", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setLoading(false);
      toast.success("Your order placed successfully");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="mt-6 h-full rounded-lg border  p-6 shadow-md md:mt-0 md:w-1/3 bg-[#151725]">
      <div className="mb-2 flex justify-between">
        <p className="text-white">Subtotal</p>
        <p className="text-white">${subs.itemsPrice}</p>
      </div>

      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold text-white">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold text-white">
            ${subs.totalPrice} USD
          </p>
        </div>
      </div>
      {loading && <CustomSpinner />}
      <button
        onClick={handleOrder}
        className="block text-center mt-6 w-full rounded-md  py-1.5 font-semibold  bg-blue-500 text-white hover:bg-blue-700"
      >
        Checkout
      </button>
    </div>
  );
}
