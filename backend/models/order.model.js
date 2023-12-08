const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema(
  {
    user: { type: Object, required: true, ref: "User" },

    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    itemsPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", order);
module.exports = Order;
