require('dotenv').config(); 

const express = require("express");
const app = express();
const port = process.env.port || 3000; 

const DB = require("./db");
DB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.get("/", (req, res) => {
  res.send("Ram Ram");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
