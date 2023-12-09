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
  try {
    const {
      id,
      name,
      price,
      description,

      brand,
      category,
      countInStock,
    } = req.body;
    console.log(req.body);
    const product = await Product.findById(id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      return res.status(200).json({ data: { updatedProduct } });
    } else {
      return res.status(404).json({
        data: null,
        msg: "Product not found",
      });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
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

module.exports.CreateProductReview = async (req, res) => {
  try {
    const { rating, comment, userInfo } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find((r) => {
        return r.user.toString() === userInfo._id.toString();
      });

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const name = userInfo.firstname + " " + userInfo.lastname;
      const review = {
        name,
        rating: Number(rating),
        comment,
        user: userInfo._id,
      };
      console.log(product);
      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      console.log(product);
      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
