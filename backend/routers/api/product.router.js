const productController = require("../../controllers/product.controller");
const Router = require("express").Router;
const router = Router();
const verifyToken = require("../../middleware/VerifyToken");
const allowedTo = require("../../middleware/allowedTo");
router.get("/", productController.get_all_products);
router.get("/:_id", productController.get_product_by_id);
router.post("/search", productController.search_by_name);
router.post(
  "/",
  verifyToken,
  allowedTo("ADMIN"),
  productController.add_product
);
router.put(
  "/:_id",
  verifyToken,
  allowedTo("ADMIN"),
  productController.update_product
);
router.delete(
  "/:_id",
  verifyToken,
  allowedTo("ADMIN"),
  productController.delete_product
);
module.exports = router;
