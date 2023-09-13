const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const collection = require('./Connect');

app.get("/", (req, res) => {
  res.send("Hello Shiva!");
});
app.post("/userLogin", async (req, res) => {
    const { name, password } = req.body; // Destructuring to access name and password
    console.log(name, password); // Check if name and password are correctly received
  
    try {
      const data = await collection.find({ name, password });
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching data.");
    }
  });
  

app.post("/postUsersData", async (req, res) => {
  const data=req.body;
  try {
    await collection.create(data);
    res.send("Data inserted successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error inserting data.");
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`listening on port:${port}`);
});
