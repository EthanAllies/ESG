const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//connect to db

const uri =
  "mongodb+srv://alleth001:5WiVGgzkPWlptY3N@cluster0.05tbf.mongodb.net/mydatabase?retryWrites=true&w=majority&tls=true";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    res.json(data);
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
});

app.get("/quizzes", async (req, res) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const data = await client.db("ESG").collection("quizzes").find().toArray();
    res.json(data);
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
});

app.get("/quizzes/:quizId", async (req, res) => {
  try {
    await client.connect();
    const quizId = req.params.quizId;
    const data = await client
      .db("ESG")
      .collection("quizzes")
      .findOne({ quiz_id: quizId });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send("Quiz not found.");
    }
  } catch (err) {
    console.error("Error fetching quiz:", err);
    res.status(500).send("Server error.");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
});

app.patch("/update-score", async (req, res) => {
  console.log("Request received:", req.body); // Log request body
  const { studentId, quizId, newScore } = req.body;

  try {
    // Convert studentId to ObjectId
    const objectId = new ObjectId(studentId);

    // Round the score
    let roundedScore = parseFloat(newScore.toFixed(2));

    // Update the score
    const result = await client
      .db("ESG")
      .collection("students")
      .updateOne(
        { _id: objectId, "scores.quiz_id": quizId },
        { $set: { "scores.$.score": roundedScore } }
      );

    console.log("Update result:", result); // Log result to see if any documents were updated

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Student or quiz not found" });
    }

    res.status(200).json({ message: "Score updated successfully" });
  } catch (error) {
    console.error("Error updating score:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

app.get("/get-score", async (req, res) => {
  const { studentId, quizId } = req.query;

  console.log("Student ID:", studentId, "Quiz ID:", quizId); // Debugging
  try {
    // Check if studentId is a valid ObjectId and create ObjectId instance
    const studentIdObject = ObjectId.isValid(studentId)
      ? new ObjectId(studentId)
      : studentId;

    await client.connect();
    const student = await client
      .db("ESG")
      .collection("students")
      .findOne({ _id: studentIdObject });
    console.log(student);
    // Check if student is found
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    console.log(student.scores);
    // Ensure scores array exists and look for the quiz ID in the scores array
    const scoreData = student.scores?.find((score) => score.quiz_id === quizId);
    console.log(student.scores, scoreData);

    if (scoreData) {
      res.json({ score: scoreData.score }); // Return the found score
    } else {
      res.json({ score: null }); // No score found for this quiz
    }
  } catch (error) {
    console.error("Error fetching score:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user/:email", async (req, res) => {
  const params = req.params;

  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const data = await client
      .db("ESG")
      .collection("students")
      .findOne({ email: params.email });
    res.json(data);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
});

app.post("/user", async (req, res) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const data = await client
      .db("ESG")
      .collection("students")
      .insertOne(req.body);
    res.json(data);
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
});

app.patch("/user", async (req, res) => {
  const { email, displayName } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ error: "Email is required for updating user" });
  }

  try {
    // Connect the client to the server
    await client.connect();

    // Find and update the user's displayName
    const result = await client
      .db("ESG")
      .collection("students")
      .updateOne(
        { email: email }, // Query to find the user by email
        { $set: { displayName: displayName } } // Update the displayName
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", result });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while updating the user",
      details: error,
    });
  } finally {
    // Optionally close the MongoDB connection
    // await client.close();
  }
});

module.exports = app;
