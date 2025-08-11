import "./style.css";
import products from "/public/api/products.json";
import { showProductContainer } from "./homeProductCards";

// This check ensures that the product-related code only runs on pages
// where the product container exists (i.e., index.html and products.html).
if (document.querySelector("#productContainer")) {
  showProductContainer(products);
}