export const homeQuantityToggle = (event, id, stock) => {
  const currentCardElement = document.querySelector(`#card${id}`);
  const productQuantity = currentCardElement.querySelector(".productQuantity");

  let quantity = parseInt(productQuantity.getAttribute("data-quantity")) || 1;

  if (event.target.className==="cartIncrement") {
    // Increment the quantity without any stock limit
     if (quantity < 30) {
       quantity += 1;
     }
      
     
    
  } else if (event.target.className === "cartDecrement") {
    // Decrement the quantity but ensure it doesn't go below 1
    if (quantity > 1) {
      quantity -= 1;
    }
  }

  productQuantity.textContent = quantity;
   productQuantity.setAttribute("data-quantity", quantity.toString());

  return quantity;
};
