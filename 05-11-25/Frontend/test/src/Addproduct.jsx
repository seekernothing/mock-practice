import { useState } from "react";
import axios from "axios";

function AddProduct({ onProductAdded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = async () => {
    try {
      const res = await axios.post("http://localhost:7000/products", {
        name,
        price: Number(price),
      });
      console.log("Product Added:", res.data);
      onProductAdded(); // refresh product list
      setName("");
      setPrice("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddProduct;
