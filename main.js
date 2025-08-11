import "./style.css";
import products from "/public/api/products.json";
import { showProductContainer } from "./homeProductCards";

// Wait until the entire HTML document is loaded before running any script
document.addEventListener("DOMContentLoaded", () => {
  // This check ensures that the product-related code only runs on pages
  // where the product container exists (i.e., index.html and products.html).
  if (document.querySelector("#productContainer")) {
    showProductContainer(products);
  }
});