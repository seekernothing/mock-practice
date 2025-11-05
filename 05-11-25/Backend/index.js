const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const PORT = 7000;
let products = JSON.parse(fs.readFileSync("products.json", "utf8"));

// get all products

app.get("/products", (req, res) => {
  res.status(200).json(products);
});

// get products by id

app.get("/products/:id", (req, res) => {
  const pid = products.find((p) => p.id === parseInt(req.params.id));
  if (!pid) {
    res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json(pid);
});

// add a new product
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    res.status(400).json({ error: "Both name and price is required" });
  }

  const newProducts = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price,
  };

  products.push(newProducts);
  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
  res.status(201).json(products);
});

// delet a product

app.delete("/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );

  if (productIndex === -1) {
    return res.status(404).json({ error: "product not found" });
  }

  products.splice(productIndex, 1);
  fs.writeFileSync("products.json", JSON.stringify(products, null, 3));
  res.status(200).json({ message: "product deleted successfully" });
});

app.listen(PORT, () => console.log("Server is running on the port 7000"));
