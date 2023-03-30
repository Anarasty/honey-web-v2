import products from "./data.js";

const productList = document.getElementById("product-list");

for (let product of products) {
  const productDiv = document.createElement("div");
  productDiv.innerHTML = `<div class="product-card">
    <img src="${product.image}">
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <p>Price: $${product.price.toFixed(2)}</p>
    </div>
  `;
  productList.appendChild(productDiv);
}

//filter products
const categoryList = document.getElementById("category-list");

categoryList.addEventListener("click", (event) => {
  event.preventDefault();

  const selectedCategory = event.target.textContent;

  //   !

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" || product.category === selectedCategory
  );

  productList.innerHTML = "";
  for (let product of filteredProducts) {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `<div class="product-card">
      <img src="${product.image}">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>Price: $${product.price.toFixed(2)}</p>
      </div>
    `;
    productList.appendChild(productDiv);
  }
});
