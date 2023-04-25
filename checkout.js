const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const checkoutItemsContainer = document.getElementById(
  "checkoutItemsContainer"
);
let checkoutItemsHTML = "";
let totalPrice = 0;

cartItems.forEach((item) => {
  const price = item.onSale ? item.newPrice : item.price;
  const quantity = item.quantity || 1;
  totalPrice += price * quantity;

  checkoutItemsHTML += `
    <div class="checkout-item">
      <img src="${item.imageUrl}" alt="${item.name}">
      <div class="checkout-item-info">
        <h3>${item.name}</h3>
        <p>Price: $${price.toFixed(2)}</p>
        <p>Quantity: ${quantity}</p>
      </div>
    </div>
  `;
});

checkoutItemsContainer.innerHTML = checkoutItemsHTML;
document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);

const completePurchaseButton = document.getElementById(
  "completePurchaseButton"
);
function clearLocalStorage() {
  localStorage.removeItem("cart");
}

document
  .getElementById("completePurchaseButton")
  .addEventListener("click", function () {
    openPopup();
    clearLocalStorage();
  });

function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
  window.location.href = "index.html";
}
