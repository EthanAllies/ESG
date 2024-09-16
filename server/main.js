const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

//connect to db

const uri = "mongodb+srv://alleth001:5WiVGgzkPWlptY3N@cluster0.05tbf.mongodb.net/";

const client = new MongoClient(uri,  {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors());
/*app.listen(3000, function () {
  console.log("Running on http://localhost:3000");
});
*/
app.get("/docs", async (req, res) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const data = await client.db("ESG").collection("docs").find().toArray();
    res.json(data)
  }finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
});


app.get("/user/:email", async (req, res) => {
  const params = req.params
  
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const data = await client.db("ESG").collection("students").findOne({email: params.email});
    res.json(data)
  }finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
});

app.post("/user", async (req, res) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const data = await client.db("ESG").collection("students").insertOne(req.body);
    res.json(data)
  }finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
});

app.patch("/user", async (req, res) => {
  const { email, displayName } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required for updating user" });
  }

  try {
    // Connect the client to the server
    await client.connect();
    
    // Find and update the user's displayName
    const result = await client.db("ESG").collection("students").updateOne(
      { email: email },                // Query to find the user by email
      { $set: { displayName: displayName } } // Update the displayName
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the user", details: error });
  } finally {
    // Optionally close the MongoDB connection
    // await client.close();
  }
});

module.exports = app





