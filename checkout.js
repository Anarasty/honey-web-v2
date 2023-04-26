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
    cartItems.forEach((item) => {
      // const url = "http://localhost:8080/cart/addProduct?token=33c154bc-b226-4f54-b939-9ef49cd8b93e";
      const token = localStorage.getItem("token");
      const url = `http://localhost:8080/cart/addProduct?token=${token}`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*"
        },
        body: JSON.stringify({
          productId: item.id,
          quantity: item.quantity
        })
      };

      fetch(url, options)
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => console.log(error));
    });

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