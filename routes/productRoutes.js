import express from "express";
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductsController,
  getSingleProductController,
  deleteProductController,
  updateProductController,
  productPhotoController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductsController,
  productCategoryController,
} from "../controllers/productController.js";

const router = express.Router();

//routes

//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update product
router.patch(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get all products
router.get("/get-product", getProductsController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//filter Product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//pagination, product per page
router.get("/product-list/:page", productListController);

//search Product
router.get("/search/:keyword", searchProductController);

//get similar Products
router.get("/related-product/:pid/:cid", relatedProductsController);

//pagination, product per page
router.get("/product-category/:slug", productCategoryController);

export default router;
