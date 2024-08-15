const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.listen(3000, function () {
  console.log("Running on http://localhost:3000");
});

app.get("/pdf", (req, res) => {
  res.json([
    {
      title: "Book1",
      description: "ljkflkdjflkjdlkjfdf",
    },
    {
      title: "Book2",
      description: "ljkflkdjflkjdlkjfdf",
    },
    {
      title: "Book3",
      description: "ljkflkdjflkjdlkjfdf",
    },
    {
      title: "Book4",
      description: "ljkflkdjflkjdlkjfdf",
    },
  ]);
});
