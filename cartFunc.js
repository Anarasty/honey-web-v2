const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function displayCartItems(items) {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  let cartItemsHTML = "";
  let totalPrice = 0;
  

  if (items.length === 0) {
    const emptyCartMsg = document.createElement("div");
    emptyCartMsg.classList.add('cart-empty');
    emptyCartMsg.textContent = "Your cart is empty!";
    cartItemsContainer.appendChild(emptyCartMsg);
    return;
  }


  items.forEach((item) => {
    const price = item.onSale ? item.newPrice : item.price;
    const quantity = item.quantity || 1;
    totalPrice += price * quantity;

    cartItemsHTML += `
      <div class="cart-item">
        <img src="${item.imageUrl}" alt="${item.name}">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>Price: $${price.toFixed(2)}</p>
          <div class="quantity">
            <button class="minus-btn" data-id="${item.id}">-</button>
            <input type="text" value="${quantity}" readonly>
            <button class="plus-btn" data-id="${item.id}">+</button>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
          </div>
        </div>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = cartItemsHTML;
  document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);

  const deleteButtons = document.querySelectorAll(".remove-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = parseInt(button.dataset.id);
      const itemIndex = cartItems.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        displayCartItems(cartItems);
        location.reload();
      }
    });
  });

  // event listeners to plus and minus buttons
  const plusBtns = document.querySelectorAll(".plus-btn");
  plusBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const item = items.find((item) => item.id == id);
      item.quantity = (item.quantity || 1) + 1;
      localStorage.setItem("cart", JSON.stringify(items));
      updateCart();
    });
  });

  const minusBtns = document.querySelectorAll(".minus-btn");
  minusBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const item = items.find((item) => item.id == id);
      if (item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cart", JSON.stringify(items));
        updateCart();
      }
    });
  });

  function updateCart() {
    displayCartItems(JSON.parse(localStorage.getItem("cart")));
  }
}

const checkoutButton = document.getElementById("checkoutButton");
checkoutButton.addEventListener("click", () => {
  // Redirect to checkout page
  window.location.href = "/checkout.html";
});
if (cartItems.length === 0) {
  checkoutButton.disabled = true;
} else {
  checkoutButton.disabled = false;
}

displayCartItems(cartItems);

