const Product = require("../models/product.model");
const mongoose = require("mongoose");

module.exports.get_all_products = async (req, res) => {
  await Product.find()
    .then((e) => {
      return res.json(e);
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(404).json({ error: err.message });
    });
};

module.exports.search_by_name = async (req, res) => {
  const searchName = req.body.name;

  const result = await Product.find({
    name: { $regex: searchName, $options: "i" },
  })
    .then((e) => {
      return res.status(200).json(e);
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

module.exports.get_product_by_id = async (req, res) => {
  var { _id } = req.params;
  _id = new mongoose.Types.ObjectId(_id);
  await Product.findById(_id)
    .then((e) => {
      return res.status(200).json(e);
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(404).json({ error: err.message });
    });
};

module.exports.add_product = async (req, res) => {
  try {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.currentUser.id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });
    const createdProduct = await product.save();
    console.log(createdProduct);
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { createdProduct } });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports.update_product = async (req, res) => {
  const body = req.body;
  var { _id } = req.params;
  _id = new mongoose.Types.ObjectId(_id);
  const isThere = await Product.findById(_id);
  if (!isThere) {
    return res.status(404).json("can't update product not found.");
  }
  await Product.findByIdAndUpdate(_id, body, { new: true })
    .then((e) => {
      return res.status(200).json(e);
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(401).json(e);
    });
};

module.exports.delete_product = async (req, res) => {
  var { _id } = req.params;
  _id = new mongoose.Types.ObjectId(_id);
  const isthere = await Product.findById(_id);
  if (!isthere) {
    return res.status(404).json("product already not in the database");
  }
  await Product.findByIdAndDelete(_id)
    .then((e) => {
      return res.status(200).json("product deleted");
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ error: err.message });
    });
};
