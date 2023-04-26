// old display product js

// function displayProducts(products) {
//   productList.innerHTML = "";
//   for (let product of products) {
//     const productDiv = document.createElement("div");
//     productDiv.innerHTML = `<div class="product-card">
//       <img src="${product.image}">
//       <h2>${product.name}</h2>
//       <div class="card-price-box">
//         ${product.onSale === true ? `<p style="text-decoration: line-through;">$${product.price.toFixed(2)}</p><p class="new-price-txt">$${product.newPrice.toFixed(2)}</p>` : `<p>$${product.price.toFixed(2)}</p>`}
//       </div>
//       <p class="limited-txt">${product.isLimited === true ? "Limited" : ""}</p>
//       <a href="productCard.html?id=${
//         product.id
//       }" class="product-card-btn">Show product</a>

//     </div>`;
//     productList.appendChild(productDiv);
//   }
// }


//!test4
// import products from "./data.js";

const products = [];

const productList = document.getElementById("product-list");
const categoryList = document.getElementById("category-list");
const saleCheckbox = document.getElementById("sale");
const limitedCheckbox = document.getElementById("limited");
const priceSelect = document.querySelector("select");

const resetButton = document.querySelector(".reset-filter");
function displayProducts() {

  fetch("http://localhost:8080/product/all")
    .then((response) => response.json())
    .then((products) => {
      productList.innerHTML = "";
      for (let product of products) {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `<div class="product-card">
          <img src="${product.imageUrl}">
          <h2>${product.name}</h2>
          <div class="card-price-box">
            ${
              product.onSale === true
                ? `<p style="text-decoration: line-through;">$${product.price.toFixed(2)}</p><p class="new-price-txt">$${product.newPrice.toFixed(2)}</p>`
                : `<p>$${product.price.toFixed(2)}</p>`
            }
          </div>
          <p class="limited-txt">${product.limited === true ? "Limited" : ""}</p>
          <a href="productCard.html?id=${product.id}" class="product-card-btn">Show product</a>
        </div>`;
        productList.appendChild(productDiv);
      }
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

function resetFilters() {
  categoryList.querySelector("li:first-child a").classList.add("selected");
  saleCheckbox.checked = false;
  limitedCheckbox.checked = false;
  priceSelect.value = "none";
  fetch("http://localhost:8080/product/all")
    .then((response) => response.json())
    .then((products) => {
      displayProducts(products);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
  categoryList.querySelectorAll("a").forEach((link) => {
    link.classList.remove("selected");
  });
}

function filterProducts() {
  fetch("http://localhost:8080/product/all")
    .then((response) => response.json())
    .then((products) => {
      const selectedCategory = categoryList.querySelector(".selected").textContent;
      const showSale = saleCheckbox.checked;
      const showLimited = limitedCheckbox.checked;
      let filteredProducts = products.filter((product) => {
        if ((showSale && !product.onSale) || (showLimited && !product.isLimited)) {
          return false;
        }
        return selectedCategory === "All" || product.category === selectedCategory;
      });

      const selectedOption = priceSelect.value;
      if (selectedOption === "small-to-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (selectedOption === "high-to-small") {
        filteredProducts.sort((a, b) => b.price - a.price);
      }

      displayProducts(filteredProducts);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

categoryList.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName === "A") {
    const selectedCategory = event.target.textContent;
    categoryList.querySelectorAll("a.category-filter-link").forEach((link) => {
      link.classList.remove("selected");
    });
    event.target.classList.add("selected");
    filterProducts();
  }
});

saleCheckbox.addEventListener("change", filterProducts);
limitedCheckbox.addEventListener("change", filterProducts);

priceSelect.addEventListener("change", filterProducts);
resetButton.addEventListener("click", resetFilters);

displayProducts(products);

///!!SERCH!

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", () => {
  const searchQuery = searchInput.value.trim().toLowerCase();

  // Если поле поиска пустое, скрываем область с результатами поиска
  if (searchQuery === "") {
    searchResults.style.display = "none";
    return;
  }

  const filteredProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();
    return productName.includes(searchQuery);
  });

  // Очищаем область с результатами поиска перед каждым новым поиском
  searchResults.innerHTML = "";

  filteredProducts.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
        <div class="search-card">
        <img src="${product.image}" alt="${product.name}">
        <p>${product.name}</p>
        </div>
      `;
    productElement.addEventListener("click", () => {
      // При клике на элемент с результатом поиска переходим на карточку продукта
      window.location.href = `productCard.html?id=${product.id}`;
    });
    searchResults.appendChild(productElement);
  });

  // Отображаем область с результатами поиска
  searchResults.style.display = "block";
});


// ??old cartProduct js render
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


//! Checkout UPDATED WITHOUT TOKENS
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
