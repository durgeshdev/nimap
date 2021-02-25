const express = require("express");

// const {getJobFilters} = require("../controllers/jobs/filters");
const {getAllCategories, createCategory, updateCategory, deleteCategory} = require("../controllers/category");
const {getAllProducts, createProduct, updateProduct, deleteProduct} = require("../controllers/product");

const router = express.Router();

//category
router.get("/category", getAllCategories);
router.post("/category",  createCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

//product
router.get("/products", getAllProducts);
router.post("/products",  createProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
