// export const products = [
//   { name: "Product 1", price: 10.99, image: "product-1.jpg" },
//   { name: "Product 2", price: 15.99, image: "product-2.jpg" },
//   { name: "Product 3", price: 20.99, image: "product-3.jpg" },
// ];

const products = [
  {
    id: 1,
    name: "Forest honey",
    category: "Honey",
    isLimited: true,
    description: "Natural honey",
    price: 20.99,
    newPrice: 18.99,
    onSale: true,
    image: "/images/mead.jpg"
  },
  {
    id: 2,
    name: "Candles",
    category: "Candles",
    isLimited: false,
    description: "Natural honey",
    price: 10.99,
    newPrice: 8.99,
    onSale: false,
    image: "/images/candle.jpg"
  },
  {
    id: 3,
    name: "Pollen",
    category: "Pollen",
    isLimited: true,
    description: "Natural honey",
    price: 30.99,
    newPrice: 28.99,
    onSale: false,
    image: "/images/pollen.jpg"
  }
];

export default products;