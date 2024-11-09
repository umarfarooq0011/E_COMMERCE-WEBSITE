import { getCartProductFromLS } from "./getCartProducts";
import { updateCartValue } from "./updateCartValue";
import { updateCartProductTotal } from "./updateCartProductTotal"; // Ensure to import this
import Swal from "sweetalert2"; // Make sure SweetAlert is installed or included

export const removeProdFromCart = (id) => {
  let cartProducts = getCartProductFromLS();

  // Find the product being removed
  const productToRemove = cartProducts.find((curProd) => curProd.id === id);

  if (!productToRemove) {
    showToastNotification("Product not found in cart!");
    return;
  }

  // SweetAlert confirmation before removing the product
  Swal.fire({
    title: "Are you sure?",
    text: `Do you want to remove "${id}" from the cart?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Remove the product from the cart
      cartProducts = cartProducts.filter((curProd) => curProd.id !== id);

      // Update localStorage after removing the item
      localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

      // Remove the div for the product
      let removeDiv = document.getElementById(`card${id}`);
      if (removeDiv) {
        removeDiv.remove();
      }

      updateCartValue(cartProducts);
      updateCartProductTotal();

      // Show SweetAlert notification for successful removal
      Swal.fire(
        "Deleted!",
        `Product with ID ${id} has been successfully  deleted from your cart.`,
        "success"
      );
    }
  });
};
