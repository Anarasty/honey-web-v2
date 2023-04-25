//!test4
// import products from "./data.js";

const products = [];

const productList = document.getElementById("product-list");
const categoryList = document.getElementById("category-list");
const saleCheckbox = document.getElementById("sale");
const limitedCheckbox = document.getElementById("limited");
const priceSelect = document.querySelector("select");
const resetButton = document.querySelector(".reset-filter");

function displayProducts(products) {
  productList.innerHTML = "";
  for (let product of products) {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `<div class="product-card">
      <img src="${product.imageUrl}">
      <h2>${product.name}</h2>
      <div class="card-price-box">
        ${
          product.onSale === true
            ? `<p style="text-decoration: line-through;">$${product.price.toFixed(
                2
              )}</p><p class="new-price-txt">$${product.newPrice.toFixed(2)}</p>`
            : `<p>$${product.price.toFixed(2)}</p>`
        }
      </div>
      <p class="limited-txt">${product.limited === true ? "Limited" : ""}</p>
      <a href="productCard.html?id=${product.id}" class="product-card-btn">Show product</a>
    </div>`;
    productList.appendChild(productDiv);
  }
}

function resetFilters() {
  categoryList.querySelector("li:first-child a").classList.add("selected");
  saleCheckbox.checked = false;
  limitedCheckbox.checked = false;
  select.value = "none";
  displayProducts(products);
  categoryList.querySelectorAll("a").forEach((link) => {
    link.classList.remove("selected");
  });
}

function filterProducts() {
  // const selectedCategory = categoryList.querySelector(".selected").textContent;
  const selectedCategory = categoryList.querySelector(".selected") ? categoryList.querySelector(".selected").textContent : "All";

  const showSale = saleCheckbox.checked;
  const showLimited = limitedCheckbox.checked;
  let filteredProducts = products.filter((product) => {
    if ((showSale && !product.onSale) || (showLimited && !product.limited)) {
      return false;
    }
    return selectedCategory === "All" || product.categoryName === selectedCategory;
  });

  const selectedOption = priceSelect.value;
  if (selectedOption === "small-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedOption === "high-to-small") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  displayProducts(filteredProducts);
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

fetch("http://localhost:8080/product/all")
  .then((response) => response.json())
  .then((data) => {
    products.push(...data);
    displayProducts(products);
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
  });

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
        <img src="${product.imageUrl}" alt="${product.name}">
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
