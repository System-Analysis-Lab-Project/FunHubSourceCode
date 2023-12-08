const productController = require("../../controllers/product.controller");
const Router = require("express").Router;
const router = Router();

router.get("/", productController.get_all_products);
router.get("/:_id", productController.get_product_by_id);
router.post('/search', productController.search_by_name);
router.post("/", productController.add_product);
router.put("/:_id", productController.update_product);
router.delete("/:_id", productController.delete_product);
module.exports = router;
