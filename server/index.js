const express = require("express");
const cors = require("cors");
const blogRouter = require("./routes/blog-route");

require("./db/index");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

// app.use("/api", (req, res) => {
//   res.send("hello world");
// });
app.listen(3000, () => {
  console.log("app is running on port:3000");
});
