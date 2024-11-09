import { getCartProductFromLS } from "./getCartProducts";
import { updateCartValue } from "./updateCartValue";
import Swal from "sweetalert2"; // Import SweetAlert2





getCartProductFromLS();

export const addToCart = (event, id, stock) => {
  let arrLocalStorageProduct = getCartProductFromLS();

  const currentProdElem = document.querySelector(`#card${id}`);

  let quantity = currentProdElem.querySelector(".productQuantity").innerText;
  let price = currentProdElem.querySelector(".productPrice").innerText;

  // Remove currency symbol from price
  price = price.replace("₨", "");

  let existingProd = arrLocalStorageProduct.find(
    (curProd) => curProd.id === id
  );
  console.log(existingProd);

  // If the product exists, update the quantity and price
  if (existingProd) {
    quantity = Number(existingProd.quantity) + Number(quantity);
    price =
      Number(
        currentProdElem
          .querySelector(".productPrice")
          .innerText.replace("₨", "")
      ) * quantity;

    let updatedCart = { id, quantity, price };
    arrLocalStorageProduct = arrLocalStorageProduct.map((curProd) => {
      return curProd.id === id ? updatedCart : curProd;
    });

    localStorage.setItem(
      "cartProductLS",
      JSON.stringify(arrLocalStorageProduct)
    );
  } else {
    // Add the new product to the cart
    price = Number(price * quantity);
    quantity = Number(quantity);

    arrLocalStorageProduct.push({ id, quantity, price });
    localStorage.setItem(
      "cartProductLS",
      JSON.stringify(arrLocalStorageProduct)
    );
  }

  // Update the cart value
  updateCartValue(arrLocalStorageProduct);

  // SweetAlert2 to show success message with custom filled cart icon
  Swal.fire({
    title: "Item Added to Cart!",
    text: `Product with ID ${id} has been successfully added to your cart.`,
    imageUrl:
      "https://media.istockphoto.com/id/160295074/vector/electronics-shopping.jpg?s=612x612&w=0&k=20&c=tq6irpToij9B620GgKRXDvMmenkYuxAt3LLdMAS8RCo=", // Example filled cart icon URL
    imageWidth: 150,
    imageHeight: 150,
    confirmButtonText: "Continue Shopping",
  });
};
