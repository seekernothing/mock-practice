import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from backend
    axios
      .get("http://localhost:7000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍 Product List</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} — ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
