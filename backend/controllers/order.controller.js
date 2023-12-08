const Order = require("../models/order.model");
const mongoose = require("mongoose");

module.exports.add_order = async (req, res) => {
  try {
    const { orderItems, itemsPrice, totalPrice, user } = req.body;
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json("Cart is empty");
    } else {
      const order = new Order({
        orderItems: orderItems.map((e) => ({
          ...e,
          product: e._id,
          _id: undefined,
        })),
        user,
        itemsPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      return res.status(201).json({ createdOrder });
    }
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

//user
module.exports.get_My_Orders = async (req, res) => {
  try {
    const userId = req.headers["_id"];
    const orders = await Order.find({ "user._id": userId });
    return res.status(200).json({ orders });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

module.exports.get_Order_ById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user.id",
      "name email"
    );
    console.log(order);
    if (order) {
      return res.status(200).json({ order });
    } else {
      return res.status(404).json({ msg: "Order not found" });
    }
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

//admin
module.exports.get_Orders = async (req, res) => {
  try {
    const Orders = await Order.find({}).populate("user.id", "id name");

    res.status(200).json({ Orders });
  } catch (err) {
    res.status(401).json({ msg: err.message });
  }
};
