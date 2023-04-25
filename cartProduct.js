// import products from "./data.js";
const productDetails = document.getElementById("productDetails");

function getProductById(id, products) {
  return products.find((product) => product.id === id);
}

function displayProduct(product) {
  productDetails.innerHTML = `
          <div class="product-details">
            <img src="${product.imageUrl}">
            <div class="product-info-section">
              <h2>${product.name}</h2>
              <p>${product.description}</p>
              <p class="category-txt">Category: ${product.categoryName}</p>
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

function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const isItemInCart = cartItems.some((item) => item.id === product.id);
  if (!isItemInCart) {
    cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
}

function getProductData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/product/all", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const products = JSON.parse(xhr.responseText);
      const urlParams = new URLSearchParams(window.location.search);
      const productId = parseInt(urlParams.get("id"));
      const product = getProductById(productId, products);
      displayProduct(product);
      const addToCartButton = document.querySelector(".add-to-cart-btn");
      addToCartButton.addEventListener("click", () => {
        addToCart(product);
      });
    }
  };
  xhr.send();
}

getProductData();
