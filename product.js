//?GOOD WORK
// import products from "./data.js";

// const productList = document.getElementById("product-list");
// const categoryList = document.getElementById("category-list");
// const saleCheckbox = document.getElementById("sale");
// const limitedCheckbox = document.getElementById("limited");

// function displayProducts(products) {
//   productList.innerHTML = "";
//   for (let product of products) {
//     const productDiv = document.createElement("div");
//     productDiv.innerHTML = `<div class="product-card">
//       <img src="${product.image}">
//       <h2>${product.name}</h2>
//       <p>${product.description}</p>
//       <p>Price: $${product.price.toFixed(2)}</p>
//     </div>`;
//     productList.appendChild(productDiv);
//   }
// }

// function filterProducts() {
//   const selectedCategory = categoryList.querySelector(".selected").textContent;
//   const showSale = saleCheckbox.checked;
//   const showLimited = limitedCheckbox.checked;

//   const filteredProducts = products.filter((product) => {
//     if ((showSale && !product.onSale) || (showLimited && !product.isLimited)) {
//       return false;
//     }
//     return selectedCategory === "All" || product.category === selectedCategory;
//   });

//   displayProducts(filteredProducts);
// }

// categoryList.addEventListener("click", (event) => {
//   event.preventDefault();
//   if (event.target.nodeName === "A") {
//     const selectedCategory = event.target.textContent;
//     categoryList.querySelectorAll("a").forEach((link) => {
//       link.classList.remove("selected");
//     });
//     event.target.classList.add("selected");
//     filterProducts();
//   }
// });

// saleCheckbox.addEventListener("change", filterProducts);
// limitedCheckbox.addEventListener("change", filterProducts);

// displayProducts(products);

//!test4
import products from "./data.js";

const productList = document.getElementById("product-list");
const categoryList = document.getElementById("category-list");
const saleCheckbox = document.getElementById("sale");
const limitedCheckbox = document.getElementById("limited");
const priceSelect = document.querySelector("select");

const resetButton = document.querySelector(".reset.filter");

function displayProducts(products) {
  productList.innerHTML = "";
  for (let product of products) {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `<div class="product-card">
      <img src="${product.image}">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>Price: $${product.price.toFixed(2)}</p>
    </div>`;
    productList.appendChild(productDiv);
  }
}

function resetFilters() {
  categoryList.querySelector("li:first-child a").classList.add("selected");
  saleCheckbox.checked = false;
  limitedCheckbox.checked = false;
  select.value = "small-to-high";
  displayProducts(products);
  categoryList.querySelectorAll("a").forEach((link) => {
    link.classList.remove("selected");
  });
}

function filterProducts() {
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
}

categoryList.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName === "A") {
    const selectedCategory = event.target.textContent;
    categoryList.querySelectorAll("a").forEach((link) => {
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
