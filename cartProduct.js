import products from "./data.js";
const productDetails = document.getElementById("productDetails");

function getProductById(id) {
  return products.find((product) => product.id === id);
}
// <p>SALE! ${product.onSale === true ? "$"+product.newPrice : "NOT SALE"}</p>
function displayProduct(product) {
  productDetails.innerHTML = `
          <div class="product-details">
            <img src="${product.image}">
            <div class="product-info-section">
              <h2>${product.name}</h2>
              <p>${product.description}</p>
              <p class="category-txt">Category: ${product.category}</p>
            <div class="price-box">${
              product.onSale === true
                ? `<p>Price: <span style="text-decoration: line-through;">$${product.price.toFixed(
                    2
                  )}</span></p><p class="sale-paragraph">Sale price: $${product.newPrice.toFixed(2)}</p>`
                : `<p>Price: $${product.price.toFixed(2)}</p>`
            }</div>
            <a href="" class="add-to-cart-btn">Add to cart</a>
            </div>
          </div>
        `;
}

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));
const product = getProductById(productId);
displayProduct(product);

const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
  const isItemInCart = cartItems.some((item) => item.id === product.id);
  if (!isItemInCart) {
    cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
}

const addToCartButton = document.querySelector(".add-to-cart-btn");
addToCartButton.addEventListener("click", () => {
  addToCart(product);
});
