const express = require("express");
const app = express();
const PORT = 8000;
app.use(express.json());
const books = require("./utils/books.json");


app.get("/books",(req,res)=>{
    res.status(200).json(books)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
