import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 🧠 Function to fetch all products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:7000/products");
      setProducts(res.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  // Fetch products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  // 🧠 Add new product
  const handleAdd = async () => {
    if (!name || !price) {
      alert("Please enter both name and price!");
      return;
    }
    try {
      await axios.post("http://localhost:7000/products", {
        name,
        price: Number(price),
      });
      setName("");
      setPrice("");
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error("❌ Error adding product:", error);
    }
  };

  // 🧠 Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/products/${id}`);
      fetchProducts(); // Refresh after delete
    } catch (error) {
      console.error("❌ Error deleting product:", error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h1>🛍 Product List</h1>

      {/* Add Product Form */}
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Product List */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {products.length === 0 ? (
          <p>No products found 😢</p>
        ) : (
          products.map((p) => (
            <li
              key={p.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                <b>{p.name}</b> — ₹{p.price}
              </span>
              <button
                onClick={() => handleDelete(p.id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
